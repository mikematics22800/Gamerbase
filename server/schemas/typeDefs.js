
const typeDefs = `
  type Game {
    id: ID!
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
    games: [Game]!
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
    saveGame(id: Int!, title: String!, releaseDate: String!, platforms: [String!]!, genres: [String!]!, image: String!): User
    removeGame(id: Int!): User
  }
`;

module.exports = typeDefs;
