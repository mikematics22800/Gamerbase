import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email   
        games {
          id  
          title
          releaseDate
          platforms 
          genres 
          image
        }
        gameCount  
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        name
        email
        games {
          id
          title
          releaseDate
          platforms 
          genres 
          image
        }        
        gameCount
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($game: GameInput!) {
    saveGame(game: $game) 
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGame(gameId: $gameId)
  }
`;
