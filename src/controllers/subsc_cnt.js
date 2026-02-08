const authmiddlware = require('../middlewares/authmiddleware')
const planModel = require('../models/planModel')
const subscriptionModel = require('../models/subscriptionModel')

const subscriptionrouter = require('express').Router()

subscriptionrouter.get('/', authmiddlware, async (req, res, next) => {
  try {
    const userSubs = await subscriptionModel.findOne({ userid: req.user.userid }).populate('plan')
    if (!userSubs) {
      return res.status(404).send({
        success: false,
        message: "subscription data not found for the user, some error occured will be taken into considertion"
      })
    }
    res.send(userSubs)
  } catch (error) {
    next(error)
  }
})
subscriptionrouter.patch('/', authmiddlware, async (req, res, next) => {
  try {
    const { planId } = req.body
    if (!planId) {
      return res.status(400).send({
        success: false,
        message: "Invaid input plan id must be provided"
      })
    }
    let userSubs = await subscriptionModel.findOne({ userid: req.user.userid })
    const plan = await planModel.findById(planId)
    if (!userSubs) {
      return res.status(404).send({
        success: false,
        message: "subscription data not found for the user, some error occured will be taken into considertion"
      })
    }
    if (!plan) {
      return res.status(404).send({
        success: false,
        message: "plan doesnt exists"
      })
    }
    if (planId == userSubs.plan && plan.planName == 'free') {
      return res.status(403).send({
        success: false,
        message: "already a free plan user"
      })
    }
    if (planId == userSubs.plan) {
      const endDate = userSubs.endDate
      const newEnddate = new Date(endDate)
      newEnddate.setMonth(newEnddate.getMonth() + 1)
      userSubs.endDate = newEnddate
      userSubs.usage = {
        genChatTokens: 0,
        genImage: 0,
        genVideo: 0
      }
      await userSubs.save()
      return res.status(200).send({
        success: true,
        message: "updated the subscription end date to next month"
      })
    }
    const startDate = Date.now()
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 1)
    userSubs.plan = planId
    userSubs.startDate = startDate
    if(plan.planName == "free"){
      userSubs.endDate = null
    }
    else{
      userSubs.endDate = endDate
    }
    userSubs.usage = {
      genChatTokens: 0,
      genImage: 0,
      genVideo: 0
    }
    await userSubs.save()
    res.status(200).send({
      success: true,
      message: "Successfully updated the subscription",
      newsubscriptiond: userSubs
    })
  } catch (error) {
    next(error)
  }
})
module.exports = subscriptionrouter