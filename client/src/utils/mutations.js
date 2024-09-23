import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email   
        games {
          _id
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
        _id
        name
        email
        games {
          _id
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
  mutation addGame($id: ID!, $game: String!) {
    addGame(id: $id, game: $game) 
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($game: String!) {
    removeGame(game: $game)
  }
`;
