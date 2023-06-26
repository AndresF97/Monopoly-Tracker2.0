const {Schema,model} = require("mongoose")

const propertySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    hex:{
        type:String,
        require:true
    }
})

const Property = model("Property",propertySchema)

module.exports = Property;