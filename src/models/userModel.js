const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  passwordHash:{
    type:String,
    required:true
  }
})

const userModel = new mongoose.model("User",userschema)

module.exports = userModel