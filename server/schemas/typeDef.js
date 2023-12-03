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
        _id:ID!
        name:String!
        savedPlayers:[Player]
    }
    type Player{
        _id: ID!
        name: String!
        token:String!
        money:Int!
        position:String
        playerPropreties:[PlayerProperty]
    }
    type PlayerProperty{
        _id:ID!
        numHouses:Int!
        Hotel:Boolean!
        properties:[Property]
    }
    type Property{
        _id: ID!
        name:String!
        hex:String!
    }
    type Query{
        allProperties: [Property]
        allGames:[Game]
        findOneGame(gameId:ID!): Game
        findOnePlayer(playerId:ID!): Player
        me: User
    }
    type Mutation{
        addUser(username:String!, email:String!, password: String!):Auth
        login(email:String!,password:String!) : Auth
        createGame(name:String!, numPlayer:String!,userId:ID!): Game
        createPlayer(name:String!, token:String!, money:Int!, position:String!,gameId:ID!):Game
        addPropertyToPlayer(playerId:String!, propertyId:String!): Player
        updatePlayerInfo(playerId:String!, name: String, token: String, money: Int, position: String): Player
        deleteGame(gameId:ID!): User
        removeOnePlayerFromGame(gameId:ID!, playerId: ID!): Game
        removePropertyFromPlayer(playerId: ID!, propertyId:ID!):Player
    }


`


module.exports = typeDefs;