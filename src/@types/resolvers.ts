import { User } from '../@generated/graphql';

export interface ResolverContext {
  user?: Pick<User, 'name' | 'id' | 'email'>;
}
