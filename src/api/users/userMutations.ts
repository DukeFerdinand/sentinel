import { ApolloError } from 'apollo-server-micro';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { v4 as uuidGen } from 'uuid';

import { ResolverObj } from '../../@types/structures';
import {
  User,
  UserLogin,
  MutationLoginArgs,
  MutationRegisterArgs,
  MutationValidateArgs,
} from '../../@generated/graphql';
import { dbConnection } from '../../lib/firestore';
import { sign } from '../utils/jwt';

const comparePassword = async (
  attempt: UserLogin,
  stored: User
): Promise<boolean> => {
  return await bcrypt.compare(attempt.password, stored.password);
};

export const userMutations: ResolverObj<'Mutation'> = {
  Mutation: {
    async register(
      _,
      { user }: MutationRegisterArgs
    ): Promise<User | ApolloError> {
      const completeUser: User = {
        ...user,
        email: user.email.toLowerCase(),
        password: await bcrypt.hash(
          user.password,
          parseInt(process.env.DB_PASSWORD_SALT as string)
        ),
        id: uuidGen(),
      };

      const usersRef = dbConnection().collection('users');

      try {
        // Call `.create(doc)` instead of `.set` if you want to guarantee a unique email.
        await usersRef.doc(completeUser.email).create(completeUser);

        // await storage.bucket('sentinel-api-dev-bucket').upload('filename', {
        //   gzip: true,
        // });

        // completeUser matches the saved document _exactly_, so instead of doing another request
        // just send back with the new id
        const user: User = {
          ...completeUser,
          token: sign(completeUser),
        };
        return user;
      } catch (error) {
        if (
          error.message &&
          (error.message as string).includes('ALREADY_EXISTS')
        ) {
          return new ApolloError('Email already in use');
        }
        console.error('[CAUGHT ERROR] =>', error.message);
      }
      return new ApolloError('Something went wrong');
    },
    login: async (
      _,
      { user }: MutationLoginArgs
    ): Promise<User | GraphQLError> => {
      const usersRef = dbConnection().collection('users');

      if (user.email) {
        try {
          // Attempt to get user doc (stored by email for unique factor)
          const res = await usersRef.doc(user.email.toLowerCase()).get();
          const data = res.data();

          // Data is undefined if there's no match, compare in same check for less "if/else" overhead
          if (data && (await comparePassword(user, data as User))) {
            const user: User = {
              ...(data as User),
              token: sign(data),
            };
            return user;
          }

          // We don't need a distinction between failed email and failed password for login
          // so just say "one of these is wrong"
          return new ApolloError('Username or password are incorrect');
        } catch (error) {
          console.error(error);
        }
      }

      console.info('[ERROR] Search by ID not implemented');

      return new ApolloError('Error fetching user');
    },
    validate: async (_, { token }: MutationValidateArgs) => {},
  },
};
