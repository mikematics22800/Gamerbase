const typeDefs = `
  type Game {
    id: ID!
    title: String!
    releaseDate: String!
    platforms: [String!]!
    genres: [String!]!
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

  input GameInput {
    id: ID!
    title: String!
    releaseDate: String!
    platforms: [String!]!
    genres: [String!]!
    image: String!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveGame(game: GameInput!): User
    removeGame(gameId: ID!): User
  }
`;

module.exports = typeDefs;
