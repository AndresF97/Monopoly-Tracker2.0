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
    }
    type Mutation{
        createGame(name:String, numPlayer:String!): Game
        createPlayer(name:String!, token:String!, money:Int!, position:String!):Player
    }


`


module.exports = typeDefs;