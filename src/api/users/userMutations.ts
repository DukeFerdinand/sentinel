import { UserInput, MutationResolvers, User } from '../../@generated/graphql';

export const userMutations: Record<'Mutation', MutationResolvers> = {
  Mutation: {
    async createUser(_, { user }: { user?: UserInput | null }): Promise<User> {
      console.info('add user', user);

      return {
        id: 'uuid',
        username: 'Duke_Ferdinand',
      };
    },
  },
};
