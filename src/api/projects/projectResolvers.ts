import { ApolloError } from 'apollo-server-micro';
import {
  Project,
  QueryProjectArgs,
  QueryProjectsArgs,
} from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { formatProjectName, projectsPath } from '../utils';

export const projectResolvers: ResolverObj<'Query'> = {
  Query: {
    async project(
      _,
      { name }: QueryProjectArgs,
      ctx: ResolverContext
    ): Promise<Project | ApolloError> {
      if (ctx.user) {
        const user = ctx.user;

        try {
          const projectsCollection = dbConnection().collection(
            projectsPath(user.email)
          );

          const project = await projectsCollection
            .doc(formatProjectName(name))
            .get();
          const data = project.data();
          if (data) {
            return data as Project;
          }

          return new ApolloError(`Project '${name}' not found`, '404');
        } catch (e) {
          console.error(e);

          return new ApolloError('Error retrieving project', '500');
        }
      }

      return new ApolloError('Authorized user required', '403');
    },
    async projects(
      _,
      { limit, offset }: QueryProjectsArgs,
      ctx: ResolverContext
    ): Promise<Project[] | ApolloError> {
      if (ctx.user) {
        const user = ctx.user;

        try {
          const projectsCollection = dbConnection().collection(
            projectsPath(user.email)
          );

          const projects = await projectsCollection.get();

          const mappedProjects = projects.docs.map((d) => {
            return d.data() as Project;
          });

          return mappedProjects;
        } catch (e) {
          console.error(e);

          return new ApolloError('Error retrieving project', '500');
        }
      }

      return new ApolloError('Authorized user required', '403');
    },
  },
};
