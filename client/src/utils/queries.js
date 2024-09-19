import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      name
      games
    }
  }
`;

export const SEARCH_GAMES = gql`
  query searchGames($search: String, $platforms: String, $genres: String) {
    searchGames(search: $search, platforms: $platforms, genres: $genres) {
      gameId
      name
      platforms
      genres
    }
  }
`;
