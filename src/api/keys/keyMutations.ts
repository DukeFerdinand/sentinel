import { FieldValue } from '@google-cloud/firestore';
import { ApolloError } from 'apollo-server-micro';
import { v4 as uuidGen } from 'uuid';

import {
  ApiKey,
  ApiKeyResponse,
  MutationAddApiKeyArgs,
  User,
} from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { environmentsPath, keysPath } from '../utils';
import { sign } from '../utils/jwt';

const createToken = (
  user: Pick<User, 'name' | 'id' | 'email'>,
  projectId: string,
  environment: string,
  keyId: string
): string => {
  const keyPayload = {
    userId: user.id,
    projectId,
    environment,
    keyId,
  };
  const key = sign(keyPayload, '365 days');

  return key;
};

export const keyMutation: ResolverObj<'Mutation'> = {
  Mutation: {
    async addApiKey(
      _,
      { config }: MutationAddApiKeyArgs,
      { user }: ResolverContext
    ): Promise<ApiKeyResponse | ApolloError> {
      if (user && config) {
        const apiToken: ApiKey = {
          id: uuidGen(),
          name: config.name,
          project: config.project,
          environment: config.environment,
        };

        const envDoc = dbConnection()
          .collection(environmentsPath(user.id, config.project))
          .doc(apiToken.environment);

        const keyCollection = dbConnection().collection(
          keysPath(user.id, config.project)
        );

        // Create or update environment in a way that we can list it later for
        // env dropdown
        await envDoc.set(
          {
            type: apiToken.environment,
            total: FieldValue.increment(0),
          },
          { merge: true }
        );

        await keyCollection.doc(apiToken.id).set(apiToken);

        // Compare against this ID and project later
        const token = createToken(
          user as User,
          apiToken.project,
          apiToken.environment,
          apiToken.id
        );

        return {
          storedInfo: apiToken,
          key: token,
        };
      }

      if (!config) {
        return new ApolloError('Key config required', '405');
      }

      return new ApolloError('Authorized user required', '403');
    },
    // revokeKey(id: ID!): ApiKey!
  },
};
