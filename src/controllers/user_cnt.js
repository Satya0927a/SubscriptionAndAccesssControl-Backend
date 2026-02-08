const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validateUserInput = require('../middlewares/userinputValidate')

const userrouter = require('express').Router()

userrouter.get('/all',async(req,res,next)=>{
  try {
    const allusers = await userModel.find({})
    res.send(allusers)
  } catch (error) {
    next(error)
  }
})
userrouter.post('/create',validateUserInput,async(req,res,next)=>{
  try {
    const {username,email,password} = req.body
    if(!username || !email || !password){
      return res.status(400).send({
        success:false,
        message:"Invalid input,"
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
userrouter.post('/login',validateUserInput,async(req,res,next)=>{
  const{email,password} = req.body
  
  if(!email || !password){
    return res.status(400).send({
      success:false,
      message:'Invalid inputs'
    })
  }
  const user = await userModel.findOne({email:email})
  
  if(!user){
    return res.status(401).send({
      success:false,
      message:"Incorrect credentials"
    })
  }
  const passverify = await bcrypt.compare(password,user.passwordHash)
  if(!passverify){
    return res.status(401).send({
      success:false,
      message:"Incorrect credentials"
    })
  }
  
  const payload = {
    userid : user._id
  }
  const token = jwt.sign(payload,process.env.SECRET)
  res.send({
    success:true,
    message:"logged in successfully",
    userdata:{
      username:user.username,
      email:user.email,
      token:token
    }
  })
})

module.exports = userrouter