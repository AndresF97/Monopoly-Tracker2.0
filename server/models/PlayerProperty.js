const {Schema,model} = require('mongoose');


const playerPropertySchema = new Schema({
    numHouses:{
        type:Number,
        default:0,
        min:0,
        max:8
    },
    Hotel:{
        type:Boolean,
        default:0
    },
    // Associates to player properties
    properties:[{
        type:Schema.Types.ObjectId,
        ref:"Property"
    }]
})

const PlayerProperty = model("PlayerPropertySchema",playerPropertySchema);


module.exports = PlayerProperty;