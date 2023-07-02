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

    const gameSeeder = await Game.insertMany(gameData);
    console.log('////    ----- GAMER SEEDS TABLE -----   ////\n')
    console.log(gameSeeder)
    console.log("------------- ///////////// ---------------\n")

    const playerSeeder = await Player.insertMany(playerData);
    console.log('////    ----- PLAYER SEEDS TABLE -----   ////\n')

    console.log(playerSeeder)

    console.log("------------- ///////////// ---------------\n")

    const propertySeeder = await Property.insertMany(propertyData);
    console.log('////    ----- PLAYER PROPERTY TABLE -----   ////\n')

    console.log(propertySeeder)

    console.log("------------- ///////////// ---------------\n")




    const userSeeder =await User.insertMany(userData)

    console.log('////    ----- USER SEEDS TABLE -----   ////\n')

    console.log(userSeeder)

    console.log("------------- ///////////// ---------------\n")

    }catch(err){
        console.error(err)
    }

    process.exit(0);
})