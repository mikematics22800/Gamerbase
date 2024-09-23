import { gql } from '@apollo/client';

export const SAVED_GAMES = gql`
  query savedGames {
    [
      {
        _id: ID!
        title: String!
        releaseDate: String!
        platforms: [String]!
        genres: [String]!
        image: String!
      }
    ]
  }
`;