const {Schema,model} = require('mongoose');


const playerSchema = new Schema({
    name:{
        type:String,
        require:true,
        min:2
    },
    token:{
        type:String,
        require:true
    },
    money:{
        type:Number,
        require:true,
        default:1500
    },
    position:{
        type:String,
        require:true,
        default:"Go"
    },
    // Associates to PlayerProperties, Must check on that
    playerPropreties:[
        {
            type:Schema.Types.ObjectId,
            ref:"PlayerPropertyGame"
        }
    ]
})

const Player = model("Player",playerSchema);


module.exports = Player;
