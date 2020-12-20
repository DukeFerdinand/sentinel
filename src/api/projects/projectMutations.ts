import { ApolloError } from 'apollo-server-micro';
import { v4 as uuidGen } from 'uuid';

import { MutationNewProjectArgs, Project } from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';

export const projectMutations: ResolverObj<'Mutation'> = {
  Mutation: {
    async newProject(
      _,
      { projectInfo }: MutationNewProjectArgs,
      ctx: ResolverContext
    ): Promise<Project | ApolloError> {
      if (ctx.user) {
        const project: Project = {
          ...projectInfo,
          id: uuidGen(),
        };
        // This info is needed for permissions/assignment
        const user = ctx.user;

        try {
          // Technically NoSQL like this means that a user might not have a 'projects' collection yet
          // but Firestore is like Mongo in that it creates one on demand
          const projectsCollection = dbConnection().collection(
            `users/${user.email}/projects`
          );

          await projectsCollection
            .doc(project.name.toLowerCase().replaceAll(' ', '-'))
            .create(project);

          return project;
        } catch (e) {
          console.error(e);

          if (e.message.includes('ALREADY_EXISTS')) {
            return new ApolloError(
              'A project with that name already exists',
              '500'
            );
          }
          return new ApolloError('Error creating project', '500');
        }
      }

      return new ApolloError('Authorized user required', '403');
    },
  },
};
