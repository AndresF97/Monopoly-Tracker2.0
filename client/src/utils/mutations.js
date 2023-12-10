import {gql} from "@apollo/client";


export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const CREATE_GAME = gql`
mutation CreateGame($name: String!) {
    createGame(name: $name) {
      _id
      name
    }
  } 
`;

export const CREATE_PLAYER= gql`
mutation CreatePlayer($name: String!, $token: String!, $money: Int!, $position: String!, $gameId: ID!) {
    createPlayer(name: $name, token: $token, money: $money, position: $position, gameId: $gameId) {
      _id
      name
      savedPlayers {
        money
        name
        position
        token
        _id
      }
    }
  }
`;

export const ADD_PROPERTY_TO_PLAYTER = gql`
mutation AddPropertyToPlayer($playerId: String!, $propertyId: String!) {
    addPropertyToPlayer(playerId: $playerId, propertyId: $propertyId) {
      _id
      money
      name
      position
      token
      playerPropreties {
        numHouses
        Hotel
        properties {
          name
          hex
          _id
        }
      }
  
    }
  }`;

export const UPDATE_PLAYER_INFO = gql`
  mutation UpdatePlayerInfo($name: String, $playerId: String!, $token: String, $money: Int, $position: String) {
    updatePlayerInfo(name: $name, playerId: $playerId, token: $token, money: $money, position: $position) {
      _id
      money
      name
      token
      position
    }
  }
  `;
export const DELETE_GAME = gql`
mutation DeleteGame($gameId: ID!) {
    deleteGame(gameId: $gameId) {
      _id
      email
      username
      Game {
        _id
        name
      }
    }
  }
`;

export const REMOVE_ONE_PLAYER_FROM_GAME = gql`
mutation RemoveOnePlayerFromGame($gameId: ID!, $playerId: ID!) {
    removeOnePlayerFromGame(gameId: $gameId, playerId: $playerId) {
      _id
      name
      savedPlayers {
        money
        name
        _id
        position
        token
      }
    }
  }
`;

export const REMOVE_PROPERTY_FROM_PLAYER = gql`
mutation RemovePropertyFromPlayer($playerId: ID!, $propertyId: ID!) {
    removePropertyFromPlayer(playerId: $playerId, propertyId: $propertyId) {
      _id
      money
      name
      playerPropreties {
        _id
        numHouses
        Hotel
      }
      position
      token
    }
  }

`;