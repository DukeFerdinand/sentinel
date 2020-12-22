import { ResolverContext } from '../../@types/resolvers';
import { DefaultObject, ResolverObj } from '../../@types/structures';
import { Count } from '../../@generated/graphql';
import { ApolloError } from 'apollo-server-micro';
import { dbConnection } from '../../lib/firestore';
import { countsPath } from '../utils';

export const countResolvers: ResolverObj<'Query'> = {
  Query: {
    async projectCount(
      _,
      __: DefaultObject,
      { user }: ResolverContext
    ): Promise<Count | ApolloError> {
      if (user) {
        const counts = await dbConnection()
          .collection(countsPath(user.id))
          .doc('projects')
          .get();

        return { total: counts.data()?.total || 0, type: 'project' } as Count;
      }
      return new ApolloError('Authorized user required', '403');
    },
  },
};
