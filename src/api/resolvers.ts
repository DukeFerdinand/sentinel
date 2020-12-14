import { mergeResolvers } from 'graphql-tools';

import { userResolvers } from './users/userResolvers';
import { userMutations } from './users/userMutations';
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
  // Misc Resolvers
  testResolvers,
]);
