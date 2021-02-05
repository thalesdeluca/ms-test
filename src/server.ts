import { DocumentNode } from 'graphql';
import { gql } from 'apollo-server-express';
import * as controllers from './controllers/index';
import * as graphqlTypes from './graph/index';

import App from './app';

const controllersMapped = Object.values(controllers).map((Controller: any) => new Controller());

interface GraphqlSchema {
  typeDefs: Array<string | DocumentNode>,
  resolvers: any
}
const graphqlSchemas = Object.values(graphqlTypes).reduce((acc, value) : GraphqlSchema => ({
  typeDefs: [...acc.typeDefs, value.typeDef],
  resolvers: { ...acc.resolvers, ...value.resolvers },
}), {
  typeDefs: [gql`
        type Query {
          _blank: String
        }
`],
  resolvers: {},
} as GraphqlSchema);

const app = new App(
  controllersMapped,
  graphqlSchemas,
  process.env.PORT || 5000,
);

app.listen();
