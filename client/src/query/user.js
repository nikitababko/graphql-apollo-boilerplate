import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      age
    }
  }
`;

/**
 * query getUser($id: ID) - где $id - переменная параметра. А ID - ее тип.
 * getUser(id: $id) - id - параметр id, типа ID, который мы указали выше.
 */
export const GET_ONE_USER = gql`
  query getUser($id: ID) {
    getUser(id: $id) {
      id
      username
    }
  }
`;
