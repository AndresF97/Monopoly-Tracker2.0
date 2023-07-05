const db = require("../config/connection")
const {
    Game,
    Player,
    PlayerProperty,
    User,
    Property
} = require("../models")
const gameData = require("./gameSeeds.json")
const playerData = require("./PlayerSeeds.json")
const propertyData = require("./propertySeeds.json")
const userData = require("./userSeeds.json")

db.once("open",async()=>{
    try{
    await Game.deleteMany({})
    await Player.deleteMany({})
    await PlayerProperty.deleteMany({})
    await User.deleteMany({})
    await Property.deleteMany({})
    // Should probably create Players with properties then add players to game
    const propertySeeder = await Property.insertMany(propertyData);
    console.log('////    ----- PLAYER PROPERTY TABLE -----   ////\n')

    console.log(propertySeeder)

    console.log("------------- ///////////// ---------------\n")
    // Now we create Player with porperties
    // This works but might need to work in future developemnt that way there are no duplicates in the array
    // NOTE: COULD CREATE A VAR TO MANIPULATE THE DATA TO EREASE AS WE DELETE
    
    for(var i =0; i < playerData.length; i++){
        await Player.create({
            ...playerData,
            playerPropreties:propertySeeder[Math.floor(Math.random()*propertySeeder.length)]
        })
    }





    // Outdate seeds work normally now must create connection
    // const gameSeeder = await Game.insertMany(gameData);
    // console.log(gameSeeder)
    // console.log('////    ----- GAMER SEEDS TABLE -----   ////\n')
    // for(var i = 0; i < gameData.length;i++){
    //     var palyerCounter = 3

    // }
    // Here We wil create the association between players and the game the are associted with
    // Should propably loop through game info and add a set of players
    // console.log("------------- ///////////// ---------------\n")

    // const playerSeeder = await Player.insertMany(playerData);
    // console.log('////    ----- PLAYER SEEDS TABLE -----   ////\n')

    // console.log(playerSeeder)

    // console.log("------------- ///////////// ---------------\n")


    // const userSeeder =await User.insertMany(userData)

    // console.log('////    ----- USER SEEDS TABLE -----   ////\n')

    // console.log(userSeeder)

    // console.log("------------- ///////////// ---------------\n")

    }catch(err){
        console.error(err)
    }

    process.exit(0);
})