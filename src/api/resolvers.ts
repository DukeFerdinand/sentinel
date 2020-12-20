import { mergeResolvers } from 'graphql-tools';

import { userResolvers } from './users/userResolvers';
import { userMutations } from './users/userMutations';
import { projectResolvers } from './projects/projectResolvers';
import { projectMutations } from './projects/projectMutations';
import { ResolverObj } from '../@types/structures';

const testResolvers: ResolverObj<'Query'> = {
  Query: {
    sayHello: () => {
      return 'Hello, Level Up!';
    },
  },
};

export default mergeResolvers([
  // User
  userResolvers,
  userMutations,
  // Project
  projectResolvers,
  projectMutations,
  // Misc Resolvers
  testResolvers,
]);
