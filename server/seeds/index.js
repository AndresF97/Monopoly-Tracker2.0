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
    let newPlayers = []
    let newGames = []
    // Now we create Player with porperties
    // This works but might need to work in future developemnt that way there are no duplicates in the array
    // NOTE: COULD CREATE A VAR TO MANIPULATE THE DATA TO EREASE AS WE DELETE
    
    for(var i =0; i < playerData.length; i++){
       newPlayers.push( await Player.create({
            name:playerData[i].name,
            token:playerData[i].token,
            playerPropreties:propertySeeder[Math.floor(Math.random()*propertySeeder.length)]
        })
       )
    }
        
    console.log("------------- ///////////// ---------------\n")

    console.log('////    ----- GAMER SEEDS AND PLAYER SEEDS CONNECT TABLE -----   ////\n')
    for(var i = 0; i < gameData.length;i++){
        // maybe we create an array of random play
        const randomPlayerId = newPlayers.map((player,i)=>{
            if(i < 3){
                return newPlayers[Math.floor(Math.random()*newPlayers.length)]._id
            }
        }).filter(notUndefined => notUndefined!==undefined)
        // console.log(randomPlayerId)
        newGames.push(await Game.create({
            ...gameData,
            savedPlayers:randomPlayerId
        })
        )

    }
    console.log('////    ----- USER SEEDS TABLE -----   ////\n')
    for(var i = 0; i < userData.length;i++){
        const randomGamesId = newGames.map((player,i)=>{
            if(i < 1){
                return newGames[Math.floor(Math.random()*newGames.length)]._id
            }
        }).filter(notUndefined => notUndefined!==undefined)
        await User.create({
            username:userData[i].username,
            email:userData[i].email,
            password:userData[i].password,
            gameMaster:randomGamesId
        })
    }
    console.log("------------- ///////////// ---------------\n")

    }catch(err){
        console.error(err)
    }

    process.exit(0);
})