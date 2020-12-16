import { ApolloError } from 'apollo-server-micro';
import bcrypt from 'bcrypt';
import { v4 as uuidGen } from 'uuid';
import { UserInput, User } from '../../@generated/graphql';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { withNamespace } from '../../utils/dbNamespace';

export const userMutations: ResolverObj<'Mutation'> = {
  Mutation: {
    async register(
      _,
      { user }: { user: UserInput }
    ): Promise<User | ApolloError> {
      console.info('user args =>', [JSON.stringify(user)]);

      const completeUser = {
        ...user,
        password: await bcrypt.hash(
          user.password,
          parseInt(process.env.DB_PASSWORD_SALT as string)
        ),
        id: uuidGen(),
      };

      const usersRef = dbConnection().collection(withNamespace('users'));

      try {
        // Call `.create(doc)` instead of `.set` if you want to guarantee a unique email.
        await usersRef.doc(completeUser.email).create(completeUser);

        // completeUser matches the saved document _exactly_, so instead of doing another request
        // just send back with the new id
        return completeUser;
      } catch (error) {
        if (
          error.message &&
          (error.message as string).includes('ALREADY_EXISTS')
        ) {
          return new ApolloError('Email already in use');
        }
      }
      return new ApolloError('Something went wrong');
    },
  },
};
