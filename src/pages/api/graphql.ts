import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../api/typeDefs';
import resolvers from '../../api/resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.info('[req] => ', req.headers.cookie.split('=')[1]);
  },
});

export default apolloServer.createHandler({ path: '/api/graphql' });

// Route config
export const config = {
  api: {
    bodyParser: false,
  },
};
