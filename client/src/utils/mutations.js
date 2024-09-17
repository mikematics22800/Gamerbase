import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
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
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation addGame($userId: ID!, $game: String!) {
    addGame(userId: $userId, game: $game) {
      _id
      name
      games
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($game: String!) {
    removeGame(game: $game) {
      _id
      name
      games
    }
  }
`;
