import { GraphQLError } from 'graphql';
import { User } from '../../@generated/graphql';
import { ResolverObj } from '../../@types/structures';
// import { dbConnection } from '../../lib/firestore';
// import { withNamespace } from '../../utils/dbNamespace';

export const userResolvers: ResolverObj<'Query'> = {
  Query: {
    user: async (
      _,
      { id }: { id: User['id'] }
    ): Promise<User | GraphQLError> => {
      console.info('user');

      // const usersRef = dbConnection.collection(withNamespace('users'));
      return {} as User;
      // return {
      //   id: 'uuid',
      //   username: 'Duke_Ferdinand',
      // };
    },
  },
};
