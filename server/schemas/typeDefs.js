const typeDefs = `
  type Game {
    _id: ID
    title: String
    dateCreated: String
    platforms: [String]
    genres: [String]
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    games: [Game]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input InputGame {
    title: String
    dateCreated: String
    platforms: [String]
    genres: [String]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveGame(game: InputGame!): User
    removeGame(gameId: String!): User
  }
`;

module.exports = typeDefs;
