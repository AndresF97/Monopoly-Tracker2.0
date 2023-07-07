const {Schema, model} = require("mongoose");


const gameSchema = new Schema({
    name:{
        type:String,
        require:true,
        minLength:1,
        maxLength:7
    },
    // must set up game assication through here
    savedPlayers:[{
        type: Schema.Types.ObjectId,
        ref:"Player"
    }]
})
// will probably add a virtual to get he player count


const Game = model("Game",gameSchema)

module.exports = Game;