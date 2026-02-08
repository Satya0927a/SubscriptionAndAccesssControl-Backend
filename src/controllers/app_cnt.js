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
    if(userSubs.status == "expired" ||(userSubs.endDate && Date.now() > userSubs.endDate)){
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

module.exports = approuter