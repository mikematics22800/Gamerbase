import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
        email  
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
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($userId: ID!, $id: Int!, $title: String!, $releaseDate: String!, $platforms: [String!]!, $genres: [String!]!, $image: String!) {
    saveGame(userId: $userId, id: $id, title: $title, releaseDate: $releaseDate, platforms: $platforms, genres: $genres, image: $image)
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($userId: ID!, $id: Int!) {
    removeGame(userId: $userId, id: $id)
  }
`;
