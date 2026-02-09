const subscriptionModel = require('../models/subscriptionModel')

const approuter = require('express').Router()

approuter.post('/gpt',async(req,res,next)=>{
  try {
    const {prompt} = req.body
    if(!prompt){
      return res.status(400).send({
        success:false,
        message:"Invalid input"
      })
    }
    const userSubs = await subscriptionModel.findOne({userid:req.user.userid}).populate('plan')
    if(userSubs.status != "active" ||(userSubs.endDate && Date.now() > userSubs.endDate)){
      return res.status(403).send({
        success:false,
        message:"Your plan is expired"
      })
    }
    if(!userSubs.plan.access.genChat){
      return res.status(403).send({
        success:false,
        message:"Your plan doesn't have access to this feature"
      })
    }
    if((userSubs.plan.limits.MaxgenChatTokens - userSubs.usage.genChatTokens) < 100 ){
      return res.status(403).send({
        success:false,
        message:"You have exhausted your token limits "
      })
    }
    //?this is just for dummy 
    const gendata = "this is your fancy aii stuff generated"
    //?after generation we need to update the users usage 
    await subscriptionModel.findOneAndUpdate({userid:req.user.userid},{$inc:{"usage.genChatTokens":100}})
    res.send({
      success:true,
      message:"generated the request",
      gendata:gendata
    })
  } catch (error) {
    next(error)
  }
})

approuter.post('/imagegen',async(req,res,next)=>{
  try {
    const {prompt} = req.body //will not be used just for dummy
    if(!prompt){
      return res.status(400).send({
        success:false,
        message:"Invalid input prompt missing"
      })
    }
    const userSubs = await subscriptionModel.findOne({userid:req.user.userid}).populate('plan')
    if(!userSubs){
      return res.status(500).send({
        success:false,
        message:"Subscription model not found for this user, this error has been forwaded and will be looked into sorry for your inconvinence"
      })
    }
    if(userSubs.status != "active"){
      return res.status(403).send({
        success:false,
        message:`Your subscription model is ${userSubs.status}`
      })
    }
    if(userSubs.endDate && (Date.now() > userSubs.endDate)){
      return res.status(403).send({
        success:false,
        message:"Your subscription is expired"
      })
    }
    if(!userSubs.plan.access.genImage){
      return res.status(403).send({
        success:false,
        message:"This feature is not included in you subscription plan"
      })
    }
    if(userSubs.plan.limits.MaxgenImage - userSubs.usage.genImage == 0){ //will never hit 0 if limit is -1 that is unlimited
      return res.status(403).send({
        success:false,
        message:"You have exhausted your image gen limit"
      })
    }
    const gendata = "image binary genareted beep beep booop...." // this is where you will call the api for gen
    //?update the usage
    await subscriptionModel.findOneAndUpdate({userid:req.user.userid},{$inc:{"usage.genImage":1}})
    res.send({
      success:true,
      message:"generated your image",
      gendata:gendata
    })
  } catch (error) {
    next(error)
  }
})

module.exports = approuter