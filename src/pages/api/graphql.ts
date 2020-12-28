import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../api/typeDefs';
import resolvers from '../../api/resolvers';
import { ResolverContext } from '../../@types/resolvers';
import { validate } from '../../api/utils/jwt';
import { User } from '../../@generated/graphql';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const context: ResolverContext = {};

    if (req.headers.authorization) {
      try {
        // This particular token will never lead to a string result, but can be undefined
        const user = validate(req.headers.authorization) as User | undefined;

        if (user) {
          const { name, id, email } = user;
          context.user = { name, id, email };
        }
      } catch (e) {
        console.warn(e);
      }
    }

    return context;
  },
});

export default apolloServer.createHandler({ path: '/api/graphql' });

// Route config
export const config = {
  api: {
    bodyParser: false,
  },
};
