const {Schema, model} = require("mongoose")
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match:[/.+@.+\..+/, 'Must use a valid email address']
    },
    password:{
        type:String,
        requier:true
    },
    // Might need to require Game here
    // this comes later when user has sign they create a game
    gameMaster:[{
        type:Schema.Types.ObjectId,
        ref: "Game"
    }]
},{
    toJSON:{
        virtuals:true
    }
});
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});


userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



const User = model("User",userSchema)

module.exports = User;
