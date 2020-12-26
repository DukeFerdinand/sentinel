import { ApolloError } from 'apollo-server-micro';
import { v4 as uuidGen } from 'uuid';

import { ApiKey, MutationAddApiKeyArgs, User } from '../../@generated/graphql';
import { ResolverContext } from '../../@types/resolvers';
import { ResolverObj } from '../../@types/structures';
import { sign } from '../utils/jwt';

const createToken = (
  user: Pick<User, 'name' | 'id' | 'email'>,
  projectId: string
): string => {
  const keyPayload = {
    userId: user.id,
    projectId,
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
    ): Promise<ApiKey | ApolloError> {
      if (user && config) {
        const apiToken: ApiKey = {
          id: uuidGen(),
          name: config?.name,
          key: 'remove this from spec',
          project: config.project,
          environment: config.environment,
        };

        const token = createToken(user as User, config.project);

        console.info(token);

        return apiToken;
      }

      return new ApolloError('Authorized user required', '403');
    },
    // revokeKey(id: ID!): ApiKey!
  },
};
