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
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
})

const userModel = new mongoose.model("User",userschema)

module.exports = userModel