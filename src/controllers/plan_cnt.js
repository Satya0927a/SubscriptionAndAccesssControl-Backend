const adminmiddleware = require('../middlewares/adminmiddleware')
const authmiddlware = require('../middlewares/authmiddleware')
const planModel = require('../models/planModel')

const planrouter = require('express').Router()

//?visible to the public
planrouter.get('/',async(req,res, next)=>{
  try {
    const plandata = await planModel.find({})
    res.send(plandata)
  } catch (error) {
    next(error)
  }
})

planrouter.post('/',authmiddlware,adminmiddleware,async(req,res,next)=>{
  try {
    const {planname,access,limits} = req.body
    if(!planname || !limits){
      return res.status(400).send({
        success:false,
        message:"invalid inputs"
      })
    }
    const newplan = await planModel({planName:planname,access:access,limits:limits})
    await newplan.save()
    res.status(200).send({
      success:true,
      message:"Created the new plan",
      newplan:newplan
    })
  } catch (error) {
    next(error)
  }
})
module.exports = planrouter