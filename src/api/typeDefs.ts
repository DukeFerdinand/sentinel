import gql from 'graphql-tag';
import { mergeTypeDefs } from 'graphql-tools';
import User from './users/User.graphql';
import Project from './projects/Project.graphql';
import Counts from './counts/Counts.graphql';
import Issue from './issues/Issue.graphql';
import Key from './keys/Key.graphql';

const inFileTypeDefs = gql`
  type Query {
    sayHello: String
  }
`;

export default mergeTypeDefs([
  // GQL tag variables
  inFileTypeDefs,
  // GraphQL files
  User,
  Project,
  Counts,
  Issue,
  Key,
]);
