const {Schema, model} = require("mongoose");


const gameSchema = new Schema({
    name:{
        type:String,
        require:true,
        minLength:1,
        maxLength:7
    },
    numPlayer:{
        type:String,
        require:true,
        deafult:0,
        min:0,
        max:8
    },
    // must set up game assication through here
    savedPlayers:[{
        type: Schema.Types.ObjectId,
        ref:"Player"
    }]
})


const Game = model("Game",gameSchema)

module.exports = Game;