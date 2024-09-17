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
  mutation addBook($userId: ID!, $book: String!) {
    addBook(userId: $userId, book: $book) {
      _id
      name
      books
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      name
      books
    }
  }
`;
