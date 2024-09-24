import { gql } from '@apollo/client';

export const SAVED_GAMES = gql`
  query savedGames {
    savedGames {
      id
      title
      releaseDate
      platforms
      genres
      image
    }
  }
`;