import { ApolloError } from 'apollo-server-micro';
import { GraphQLError } from 'graphql';
import { User, UserLogin } from '../../@generated/graphql';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { withNamespace } from '../../utils/dbNamespace';
// import { dbConnection } from '../../lib/firestore';
// import { withNamespace } from '../../utils/dbNamespace';

export const userResolvers: ResolverObj<'Query'> = {
  Query: {
    login: async (
      _,
      { user }: { user: UserLogin }
    ): Promise<User | GraphQLError> => {
      const usersRef = dbConnection().collection(withNamespace('users'));

      if (user.email) {
        try {
          const res = await usersRef.doc(user.email).get();
          const data = res.data();
          if (data) {
            return data as User;
          }
          return new ApolloError('User not found', '404');
        } catch (error) {
          console.error(error);
        }
      }

      console.info('[ERROR] Search by ID not implemented');

      return new ApolloError('Error fetching user');
    },
  },
};
