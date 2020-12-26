import { ResolverObj } from '../../@types/structures';
import { ApiKey, QueryActiveKeysArgs } from '../../@generated/graphql';
import { ApolloError } from 'apollo-server-micro';
import { ResolverContext } from '../../@types/resolvers';

export const keyResolvers: ResolverObj<'Query'> = {
  Query: {
    async activeKeys(
      _,
      { project }: QueryActiveKeysArgs,
      { user }: ResolverContext
    ): Promise<Array<ApiKey> | ApolloError> {
      if (user) {
        return [
          {
            id: 'id',
            name: 'Name',
            key: 'key',
            project,
          },
        ];
      }

      return new ApolloError('Authorized user required', '403');
    },
  },
};
