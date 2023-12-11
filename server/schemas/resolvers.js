const { AuthenticationError } = require("apollo-server-express");
const {
    Game,
    Player,
    PlayerProperty,
    Property,
    User
} = require("../models")
const { signToken } = require("../utils/auth");
const { sign } = require("jsonwebtoken");


const resolvers = {
    Query: {
        // Added to typeDefs
        // THIS QUERY WORKS
        allProperties: async () => {
            return Property.find()
        },
        // Added to typeDefs
        // THIS QUERY WORKS
        allGames: async () => {
            return Game.find().populate('savedPlayers')
        },
        // Need get me for JWT services
        // Added to typeDef
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('username email').populate("gameMaster")
                return userData
            }
            throw new AuthenticationError("Not logged In!")
        },
        // Added to typeDef
        // might create a query to get single player with all the properties
        // THIS QUERY WORKS
        findOneGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const game = await Game.findById(
                    { _id: gameId }
                ).populate("savedPlayers")
                return game
            }
            throw new AuthenticationError("You're not logged in")
        },
        // Get all Player related to Game
        // findOnePlayer
        // ---- //
        // Added to typeDef
        // THIS ONE WORKS 
        // NOTE: Only players with inque ids
        findOnePlayer: async (parent, { playerId }, context) => {
            if (context.user) {
                console.log(playerId)
                const player = await Player.findById({ _id: playerId })
                console.log(player)
                if (!player) {
                    console.error("no player found with that id")
                }
                return player
            }
            throw new AuthenticationError("Please Log in")
        }


    },

    Mutation: {
        // Added to typeDef
        // The add User Mutation works
        addUser: async (parent, args) => {
            // once user has been created they must create a new game
            const user = await User.create(args)
            const token = signToken(user);
            return { user, token }

        },
        // Added to typeDef
        // The login mutation works
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('user not found')
            }
            const correctPassword = user.isCorrectPassword(password)
            if (!correctPassword) {
                throw new AuthenticationError("Incorrect password")
            }
            const token = signToken(user)
            return { token, user }

        },

        // Added to typeDef
        // This works but is no exact it can be better i want to return gameBelongsToUser and not new Game

        createGame: async (parent, args, context) => {
            if (context.user) {
                const newGame = await Game.create(args)
                console.log(newGame)
                const gameBelongsToUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { gameMaster: newGame._id } }
                ).populate("gameMaster")
                return newGame
            }
            throw new AuthenticationError("You're not logged in!")
        },
        // Added to typeDef
        // This works
        createPlayer: async (parent, args, context) => {
            // This add a player to a new game

            if (context.user) {
                console.log(args)
                const newPlayer = await Player.create(args)
                if (!newPlayer) {
                    console.error('new player could not be added')
                }
                const newPlayerToGame = await Game.findByIdAndUpdate(
                    { _id: args.gameId },
                    { $addToSet: { savedPlayers: newPlayer._id } }

                ).populate('savedPlayers')
                return newPlayerToGame
            }
            throw new AuthenticationError("You're not logged in!")
        },
        // Find A player and gave the player that specifif property
        // Added to typeDef
        // This works
        addPropertyToPlayer: async (parent, { playerId, propertyId }, context) => {
            if (context.user) {

                // create playerPorperty
                const newplayerProperty = await PlayerProperty.create(
                    { properties: propertyId }
                )
                if (!newplayerProperty) {
                    console.error('could not create new playerproperty')
                }
                console.log(newplayerProperty)
                // add playerPrperty to Player
                const PlayerToProperty = await Player.findByIdAndUpdate(
                    { _id: playerId },
                    { $addToSet: { playerPropreties: newplayerProperty._id } },
                    { new: true }
                ).populate({
                    path: 'playerPropreties',
                    populate: [{
                        path: 'properties'
                    }]

                })
                return PlayerToProperty
            }
            throw new AuthenticationError("You're not logged in")
        },


        // -- //

        // Update a Players Porperty, Money, Position
        // typeDef
        // This works but might give late info, have to click the button twice
        updatePlayerInfo: async (prarent, args, context) => {

            if (context.user) {
                const foundPlayer = await Player.findByIdAndUpdate(
                    { _id: args.playerId },
                    { $set: args }
                ).populate('playerPropreties')
                return foundPlayer
            }
            throw new AuthenticationError("You're not logged in!")
        },
        // Added to typeDef
        // Delete a Game
        // this function works
        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                const game = await Game.findByIdAndRemove(
                    { _id: gameId }
                )
                if (!game) {
                    console.error("Game not found")
                }
                const userData = await User.findOneAndUpdate(
                    { gameMaster: gameId },
                    { $pull: { gameMaster: gameId } },
                    { new: true }
                ).populate('gameMaster')
                return userData
            }
            return new AuthenticationError("You're not logged in!")
        },
        // Added to typeDef
        // This Wors
        removeOnePlayerFromGame: async (parent, { playerId, gameId }, context) => {
            if (context.user) {
                const removePlayer = await Player.findByIdAndRemove(
                    { _id: playerId },
                )
                if (!removePlayer) {
                    console.error("NO player with that Id!")
                }
                const removedPlayerFromGame = await Game.findByIdAndUpdate(
                    { _id: gameId },
                    { $pull: { savedPlayers: playerId } }
                ).populate('savedPlayers')
                if (!removedPlayerFromGame) {
                    console.error("No game found with this Id")
                }
                return removedPlayerFromGame
            }
            throw new AuthenticationError("You're not logged in!")
        },

        // Added to typeDef
        // Delete a Player specif property
        // This Works
        removePropertyFromPlayer: async (parent, { playerId, propertyId }, context) => {
            if (context.user) {
                const removePropertyFromPlayer = await Player.findByIdAndUpdate(
                    { _id: playerId },
                    { $pull: { playerPropreties: propertyId } }
                ).populate('playerPropreties')
                if (!removePropertyFromPlayer) {
                    console.error("No property found with that Id!")
                }
                return removePropertyFromPlayer
            }
            throw new AuthenticationError("You're not logged in!")
        }


        // -- //

    }

};


module.exports = resolvers;