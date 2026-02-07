const userModel = require('../models/userModel')

const userrouter = require('express').Router()

userrouter.get('/all',async(req,res,next)=>{
  try {
    const allusers = await userModel.find({})
    res.send(allusers)
  } catch (error) {
    next(error)
  }
})
module.exports = userrouter