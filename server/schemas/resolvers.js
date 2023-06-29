const {
    Game,
    Player,
    PlayerProperty,
    Property,
    User
} = require("../models")


const resolvers = {
    Query:{
        allProperties:async ()=>{
            return Property.find()
        }
        // might create a query to get single player with all the properties


        // ---- //

        // Get all Player related to Game

        // ---- //


    },

    Mutation: {
        createGame:async(parent,{name,numPlayer})=>{
            return Game.create({name,numPlayer})
        },
        createPlayer:async(parent,{name,token,money,position,GameId})=>{
            return Player.create({name,token,money,position,GameId})
        },
        // Find A player and gave the player that specifif property


        // -- //

        // Update a Players Porperty 


        // -- //


        // Update a Players Money 


        // -- //



        // Update a Players position 


        // -- //
        

        // Delete a Game



        // -- //


        // Delete a Player from a game



        // -- //       
        
        // Delete a Player specif property



        // -- //

    }

};


module.exports = resolvers;