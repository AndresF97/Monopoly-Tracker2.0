import {gql} from "@apollo/client"


export const ALL_PROPERTIES = gql`
query AllProperties {
    allProperties {
      _id
      hex
      name
    }
  }
`;

export const ALL_GAMES = gql`
query AllGames {
    allGames {
      _id
      name
      savedPlayers {
        _id
        name
        position
        token
        money
      }
    }
  }

`;

export const FIND_ONE_GAME = gql`
query FindOneGame($gameId: ID!) {
    findOneGame(gameId: $gameId) {
      name
      savedPlayers {
        money
        name
        position
        token
      }
    }
  }
`;

export const FIND_ONE_PLAYER = gql`
query FindOnePlayer($playerId: ID!) {
    findOnePlayer(playerId: $playerId) {
      _id
      money
      name
      position
      token
    }
  }
`;
// Done

export const ME = gql`
query Me {
    me {
      _id
      email
      username
      gameMaster {
        name
        _id
        savedPlayers{
          _id
          name
          token
          money
          position
        }

      }
    }
  }

`;
