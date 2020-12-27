import { FieldValue } from '@google-cloud/firestore';
import { ApolloError } from 'apollo-server-micro';
import { v4 as uuidGen } from 'uuid';

import {
  MutationDeleteProjectArgs,
  MutationNewProjectArgs,
  Project,
} from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { countsPath, formatProjectName, projectsPath } from '../utils';

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
            projectsPath(user.id)
          );
          const counts = dbConnection().collection(countsPath(user.id));

          const incProjects = FieldValue.increment(1);

          const existingCheck = await projectsCollection
            .select('name')
            .where('name', '==', project.name)
            .get();

          if (!existingCheck.empty) {
            // This will get caught by the existing catcher
            throw new Error('ALREADY_EXISTS');
          }

          await projectsCollection.doc(project.id).create(project);

          await counts.doc('projects').update({
            total: incProjects,
          });

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
    async deleteProject(
      _,
      { id }: MutationDeleteProjectArgs,
      ctx: ResolverContext
    ): Promise<boolean | ApolloError> {
      if (ctx.user) {
        // This info is needed for permissions/assignment
        const user = ctx.user;

        try {
          const projectsCollection = dbConnection().collection(
            projectsPath(user.id)
          );
          const counts = dbConnection().collection(countsPath(user.id));
          const incProjects = FieldValue.increment(-1);

          await projectsCollection.doc(id).delete();

          await counts.doc('projects').update({
            total: incProjects,
          });

          return true;
        } catch (e) {
          console.error(e);
          return new ApolloError('Error deleting project', '500');
        }
      }

      return new ApolloError('Authorized user required', '403');
    },
  },
};
