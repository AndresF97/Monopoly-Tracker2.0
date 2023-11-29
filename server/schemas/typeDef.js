const {gql} = require("apollo-server-express")

const typeDefs = gql`
    type User{
        _id:ID!
        username:String!
        email:String!
        Game:[Game]
    }

    type Auth{
        token: ID!
        user:User
    }

    type Game {
        name:String!
        numPlayer:Int!
        savedPlayers:[Player]
    }
    type Player{
        name: String!
        token:String!
        money:Int!
        position:String
        PlayerProperty:[PlayerProperty]
    }
    type PlayerProperty{
        numHouses:Int!
        Hotel:Boolean!
        properties:[Property]
    }
    type Property{
        name:String!
        hex:String!
    }
    type Query{
        allProperties: [Property]
        allGames:[Game]
        findOneGame: Game
        findOnePlayer: Player
        me: User
    }
    type Mutation{
        addUser(username:String!, email:String!, password: String!):Auth
        login(email:String!,password:String!) : Auth
        createGame(name:String!, numPlayer:String!): Game
        createPlayer(name:String!, token:String!, money:Int!, position:String!):Player
        addPropertyToPlayer(playerId:String!, propertyId:String!): Player
        updatePlayerInfo(playerId:String!, name: String, token: String, money: Int, position: String): Player
        deleteGame(gameId:String): User
        removeOnePlayerFromGame(gameId:String!, playerId: String!): User
        removePropertyFromPlayer(playerId: String!, propertyId:String!):User
    }


`


module.exports = typeDefs;