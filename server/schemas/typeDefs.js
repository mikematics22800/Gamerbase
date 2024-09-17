const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    games: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveGame(userId: ID!, game: String!): User
    removeGame(game: String!): User
  }
`;

module.exports = typeDefs;
