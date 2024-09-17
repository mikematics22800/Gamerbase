const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    books: [String]
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
    saveGame(userId: ID!, book: String!): User
    removeGame(book: String!): User
  }
`;

module.exports = typeDefs;
