import { ResolverObj } from '../../@types/structures';
import { ApiKey, QueryActiveKeysArgs } from '../../@generated/graphql';
import { ApolloError } from 'apollo-server-micro';
import { ResolverContext } from '../../@types/resolvers';
import { dbConnection } from '../../lib/firestore';
import { keyPath, keysPath } from '../utils';

export const keyResolvers: ResolverObj<'Query'> = {
  Query: {
    async activeKeys(
      _,
      { project }: QueryActiveKeysArgs,
      { user }: ResolverContext
    ): Promise<Array<ApiKey> | ApolloError> {
      if (user && project) {
        const keysCollection = dbConnection().collection(
          keysPath(user.id, project)
        );

        const activeKeys = await keysCollection.get();

        const mappedKeys = activeKeys.docs.map((k) => k.data());

        return mappedKeys as Array<ApiKey>;
      }

      if (!project) {
        return new ApolloError('Project id required', '403');
      }

      if (!user) {
        return new ApolloError('Authorized user required', '403');
      }

      return new ApolloError('Unhandled edge case in key resolvers', '500');
    },
  },
};
