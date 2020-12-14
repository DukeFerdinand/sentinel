import { UserInput } from '../../@generated/graphql';
import { ResolverObj } from '../../@types/structures';

export const userMutations: ResolverObj<'Mutation'> = {
  Mutation: {
    async createUser(_, { user }: { user: UserInput }): Promise<void> {
      console.info('add user', user);
    },
  },
};
