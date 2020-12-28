import { FieldValue } from '@google-cloud/firestore';
import { ApolloError } from 'apollo-server-micro';
import { randomBytes } from 'crypto';

import { ApiKey, MutationAddApiKeyArgs } from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { dbConnection } from '../../lib/firestore';
import { environmentsPath, keysPath } from '../utils';

export const keyMutation: ResolverObj<'Mutation'> = {
  Mutation: {
    async addApiKey(
      _,
      { config }: MutationAddApiKeyArgs,
      { user }: ResolverContext
    ): Promise<ApiKey | ApolloError> {
      if (user && config) {
        // Create all manually generated key data first
        const bareToken = randomBytes(36).toString('hex');
        const apiKeyData = {
          name: config.name,
          environment: config.environment,

          //? TODO: Look into pros/cons of storing unhashed keys
          //? Related: https://stackoverflow.com/a/30552612
          token: bareToken,
        };

        /**
         * envDoc is treated as a node for tracking totals
         * as well as a tentative target for issue collections
         */
        const envDoc = dbConnection()
          .collection(environmentsPath(config.project))
          .doc(apiKeyData.environment);

        const keyCollection = dbConnection().collection(
          keysPath(config.project)
        );

        // Check if doc with name exists already
        const existing = await keyCollection
          .where('name', '==', apiKeyData.name)
          .get();

        if (!existing.empty) {
          return new ApolloError('API key with that name already exists');
        }

        // Create or update environment in a way that we can list it later
        await envDoc.set(
          {
            total: FieldValue.increment(0),
          },
          { merge: true }
        );

        // Init new doc then save, as usual
        const newKeyDoc = keyCollection.doc();
        await newKeyDoc.set(apiKeyData);

        // The ONLY time this token is ever sent to the client
        return {
          id: newKeyDoc.id,
          ...apiKeyData,
          // token: `<projectId>.<token>`
          token: `${config.project}.${apiKeyData.token}`,
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
