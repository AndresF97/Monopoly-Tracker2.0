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
        // Need get me for JWT services
        me: async (parent,args,context)=>{
            if(context.user){
                const userData = await User.findOne({_id:context.user._id}).select('-__v password').populate("gameMaster")
                return userData
            }
            throw AuthenticationError("Not logged In!")
        },
        // might create a query to get single player with all the properties
        findOneGame: async(parent, args,context)=>{
            if(context.user){
                const game = await Game.findById(
                    {_id:args.gameId}
                ).populate("savedPlayers")
                return game
            }
            throw new AuthenticationError("You're not logged in")
        },

        // ---- //

        // Get all Player related to Game
        // findOnePlayer
        // ---- //
        findOnePlayer: async(parent, args,context)=>{
            if(context.user){
                const player = await Player.findById({_id:args.playerId})
                if(!player){
                    console.error("no player found with that id")
                }
                return player
            }
            throw AuthenticationError("Please Log in")
        }


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
        createPlayer:async(parent,{name,token,money,position,GameId},context)=>{
            // This add a player to a new game

             if(context.user){
                const newPlayer = await Player.create({name,token,money,position})
                if(!newPlayer){
                    console.error('new player could not be added')
                }
                const newPlayerToGame = await Game.findByIdAndUpdate(
                    {_id:GameId},
                    {$addToSet:{savedPlayers:newPlayer._id}}
                    
                )
                return newPlayerToGame
            }
            throw new AuthenticationError("You're not logged in!")
        },
        // Find A player and gave the player that specifif property
        addPropertyToPlayer: async (parent,{playerId,propertyId},context)=>{
            if(context.user){
                // create playerPorperty
                const newplayerProperty = await PlayerProperty.create(
                    {$addToSet:{properties:propertyId}}
                )
                if(!newplayerProperty){
                    console.error('could not create new playerproperty')
                }
                // add playerPrperty to Player
                const PlayerToProperty = await Player.findByIdAndUpdate(
                    {_id:playerId},
                    {$addToSet:{playerPropreties:newplayerProperty._id}}
                ).populate('playerPropreties').populate('properties')
                return PlayerToProperty
            }
            throw new AuthenticationError("You're not logged in")
        },
        

        // -- //

        // Update a Players Porperty, Money, Position

        UpdatePlayerInfo: async (prarent,args,context)=>{
            if(context.user){
                const foundPlayer = await Player.findByIdAndUpdate(
                    {_id:args.playerId},
                    {name:args.name},
                    {token:args.token},
                    {money:args.money},
                    {position:args.position}
                ).populate('playerProperties')
                return foundPlayer
            }
            throw new AuthenticationError("You're not logged in!")
        },
        // Delete a Game
        deleteGame: async (parent,{gameId},context)=>{
            if(context.user){
                const game = await Game.findByIdAndRemove(
                    {_id:gameId}
                    )
                if(!game){
                    console.error("Game not found")
                }
                return ({Message:"Game was deleted"})
            }
            return new AuthenticationError("You're not logged in!")
        },
        removeOnePlayerFromGame: async (parent,args,context)=>{
            if(context.user){
                const removedGame = await Game.findByIdAndUpdate(
                    {_id:args.gameId},
                    {$pull:{savedPlayers:args.playedId}}
                )
                if(!removedGame){
                    console.error("No game found with this Id")
                }
                return ({Messsage:"Player succesfully removed"})
            }
            throw new AuthenticationError("You're not logged in!")
        }


        // -- //


        // Delete a Player from a game



        // -- //       
        
        // Delete a Player specif property



        // -- //

    }

};


module.exports = resolvers;