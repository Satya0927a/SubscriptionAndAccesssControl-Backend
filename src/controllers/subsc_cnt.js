const subscriptionModel = require('../models/subscriptionModel')

const subscriptionrouter = require('express').Router()

//!dev route temporary
subscriptionrouter.get('/',async(req,res,next)=>{
  try {
    const allsubs = await subscriptionModel.find({}).populate('plan')
    res.send(allsubs)
  } catch (error) {
    next(error)
  }
})
module.exports = subscriptionrouter