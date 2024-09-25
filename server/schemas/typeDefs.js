
const typeDefs = `
  type Game {
    userId: ID!
    id: Int!
    title: String!
    releaseDate: String!
    platforms: [String]!
    genres: [String]!
    image: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    gameCount: Int!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    savedGames: [Game]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveGame(userId: String!, id: Int!, title: String!, releaseDate: String!, platforms: [String!]!, genres: [String!]!, image: String!): Boolean
    removeGame(userId: ID!, id: Int!): Boolean
  }
`;

module.exports = typeDefs;
