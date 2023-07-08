const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    
    },
    email: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    imagePath:{
        type:String,
        default:''}

})

const User = mongoose.model("user",userSchema)
module.exports = User


