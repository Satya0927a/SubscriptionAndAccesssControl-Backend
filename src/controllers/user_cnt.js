const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const isValidEmail = require('../utilis/functions')

const userrouter = require('express').Router()

userrouter.get('/all',async(req,res,next)=>{
  try {
    const allusers = await userModel.find({})
    res.send(allusers)
  } catch (error) {
    next(error)
  }
})
userrouter.post('/create',async(req,res,next)=>{
  try {
    const {username,email,password} = req.body
    if(!username || !email || !password){
      return res.status(400).send({
        success:false,
        message:"Invalid input,"
      })
    }
    if(!isValidEmail(email)){
      return res.status(400).send({
        success:false,
        message:"Incorrect Email format"
      })
    }
    if(password.length < 8 || username.length < 3){
      return res.status(400).send({
        success:false,
        message:"The length of password and username must be 8 and 3 respectively"
      })
    }
    const passhash = await bcrypt.hash(password,10)
    const newuser = new userModel({username:username,email:email,passwordHash:passhash})
    await newuser.save()
    res.status(201).send({
      success:true,
      message:"New user accound created",
      userdata:{
        _id:newuser._id,
        username:newuser.username,
        email:newuser.email
      }
    })
  } catch (error) {
    next(error)
  }
})
module.exports = userrouter