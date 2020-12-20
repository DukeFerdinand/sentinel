import { v4 as uuidGen } from 'uuid';

import { MutationNewProjectArgs, Project } from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';

export const projectMutations: ResolverObj<'Mutation'> = {
  Mutation: {
    async newProject(
      _,
      { projectInfo }: MutationNewProjectArgs,
      ctx: ResolverContext
    ): Promise<Project> {
      console.info('[ project, context ] =>', projectInfo, ctx);

      const project = {
        ...projectInfo,
        id: uuidGen(),
      };

      return project;
    },
  },
};
