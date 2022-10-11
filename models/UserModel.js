const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique : true
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User',userModel)

module.exports = User