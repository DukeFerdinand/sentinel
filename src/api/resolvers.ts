import { mergeResolvers } from 'graphql-tools';

import { userResolvers } from './users/userResolvers';
import { userMutations } from './users/userMutations';
import { projectResolvers } from './projects/projectResolvers';
import { projectMutations } from './projects/projectMutations';
import { countResolvers } from './counts/countResolvers';
import { issueResolvers } from './issues/issueResolvers';
import { keyResolvers } from './keys/keyResolvers';
import { keyMutation } from './keys/keyMutations';
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
  // Issues
  issueResolvers,
  // Api Keys
  keyResolvers,
  keyMutation,
  // Misc Resolvers
  countResolvers,
  testResolvers,
]);
