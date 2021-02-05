import { gql } from "apollo-server-express";

const typeDef = gql`
  type User {
    id: ID!
    name: String
    phone: String

    auth: Auth
  }

  extend type Query {
    user(id: ID!): User
    users(id: ID!): [User]
  }
`;

const resolvers = {
  Query: {
    user: () => {},
    users: () => {},
  },
};

export const User = {
  typeDef,
  resolvers,
};
