import { ApolloError } from 'apollo-server-micro';
import {
  Environment,
  Issue,
  IssueCollection,
  QueryEnvironmentsArgs,
  QueryIssueArgs,
  QueryIssuesArgs,
} from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { environmentsPath } from '../utils';

export const issueResolvers: ResolverObj<'Query'> = {
  Query: {
    // issue(_, { issueId }: QueryIssueArgs, {}: ResolverContext) {},
    async issues(
      _,
      { projectId, environment }: QueryIssuesArgs,
      { user }: ResolverContext
    ): Promise<IssueCollection | ApolloError> {
      if (!user) {
        return new ApolloError('Authorized user required');
      }

      try {
        const env = dbConnection().collection(environmentsPath(projectId));

        // Totals/metadata object
        const envDoc = env.doc(environment);
        const envData = await envDoc.get();

        if (!envData.exists) {
          return new ApolloError(
            `Cannot find requested environment: ${environment}`
          );
        }

        // Env exists, attempt to collect issues (ALL for now)
        const issues = await envDoc.collection('issues').get();

        const mapped = issues.docs.map((d) => {
          const data = d.data();
          return {
            ...data,
            extra: data.extra && JSON.stringify(data.extra),
            id: d.id,
          } as Issue;
        });

        return {
          issues: mapped,
          count: envData.data()?.total,
        };
      } catch (e) {
        console.error('caught error', e);
        return new ApolloError(e.message);
      }

      // Catch all "500" style error
      return new ApolloError('Something went wrong');
    },
    async environments(
      _: ParentNode,
      { projectId }: QueryEnvironmentsArgs,
      { user }: ResolverContext
    ): Promise<Environment[] | ApolloError> {
      if (!user) {
        return new ApolloError('Authorized user required');
      }

      try {
        const envCollection = dbConnection().collection(
          environmentsPath(projectId)
        );

        const data = await envCollection.get();
        return data.docs.map((d) => {
          return { ...d.data(), name: d.id } as Environment;
        });
      } catch (e) {
        console.error(e);
        return new ApolloError('Error when retrieving environments');
      }
    },
  },
};
