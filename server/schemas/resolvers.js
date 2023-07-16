const { AuthenticationError } = require("apollo-server-express");
const {
    Game,
    Player,
    PlayerProperty,
    Property,
    User
} = require("../models")
const {signToken} = require("../utils/auth");
const { sign } = require("jsonwebtoken");


const resolvers = {
    Query:{
        allProperties:async ()=>{
            return Property.find()
        },
        allGames:async ()=>{
            return Game.find().populate('savedPlayers')
        },
        oneGame:async(parent,{gameId},context)=>{
            return Game.findOne({_id:gameId}).populate('savedPlayers')
        },
        // Need get me for JWT services
        me: async (parent,args,context)=>{
            if(context.user){
                const userData = await User.findOne({_id:context.user._id}).select('-__v password')
                return userData
            }
            throw AuthenticationError("Not logged In!")
        }
        // might create a query to get single player with all the properties


        // ---- //

        // Get all Player related to Game

        // ---- //


    },

    Mutation: {
        addUser:async(parent,args)=>{
            // once user has been created they must create a new game
            const user = await User.create(args)
            const token = signToken(user);
            return {user, token}

        },
        login:async(parent, {email,password})=>{
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('user not found')
            }
            const correctPassword = user.isCorrectPassword(password)
            if(!correctPassword){
                throw new AuthenticationError("Incorrect password")
            }
            const token = signToken(user)
            return {token, user}

        },
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