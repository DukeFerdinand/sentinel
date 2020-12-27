import { ResolverObj } from '../../@types/structures';
import { ApiKey, QueryActiveKeysArgs } from '../../@generated/graphql';
import { ApolloError } from 'apollo-server-micro';
import { ResolverContext } from '../../@types/resolvers';
import { dbConnection } from '../../lib/firestore';
import { keysPath } from '../utils';

export const keyResolvers: ResolverObj<'Query'> = {
  Query: {
    async activeKeys(
      _: unknown,
      { projectId }: QueryActiveKeysArgs,
      { user }: ResolverContext
    ): Promise<Array<ApiKey> | ApolloError> {
      if (user && projectId) {
        // Keys are tied to a project, so they're stored that way too
        const keysCollection = dbConnection().collection(keysPath(projectId));

        const activeKeys = await keysCollection.get();

        const mappedKeys = activeKeys.docs.map((k) => ({
          ...k.data(),
          id: k.id,
        }));

        return mappedKeys as Array<ApiKey>;
      }

      if (!projectId) {
        return new ApolloError('Project id required to query keys', '400');
      }

      if (!user) {
        return new ApolloError('Authorized user required', '403');
      }

      return new ApolloError('Unhandled edge case in key resolvers', '500');
    },
  },
};
