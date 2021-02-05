import { gql } from "apollo-server-express";

const typeDef = gql`
  type Auth {
    id: ID!
    name: String
    phone: String

    user: User
  }

  extend type Query {
    auth(id: ID!): Auth
    auths(id: ID!): [Auth]
  }
`;

const resolvers = {
  Query: {
    auth: () => {},
    auths: () => {},
  },
};

export const Auth = {
  typeDef,
  resolvers,
};
