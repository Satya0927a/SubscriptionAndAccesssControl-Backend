const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const authmiddlware = async(req,res,next)=>{
  try {
    const authorization = req.headers.authorization
    if(!authorization){
      return res.status(400).send({
        success:false,
        message:"Authorization token must be provided for this route"
      })
    }
    const token = authorization.replace("Bearer ","")
    const payload = jwt.verify(token,process.env.SECRET)
    if(!payload){
      return res.status(401).send({
        success:false,
        message:"Unauthorized for this route"
      })
    }
    const user = await userModel.findById(payload.userid)
    if(!user){
      return res.status(404).send({
        success:false,
        message:"User not found"
      })
    }
    req.user = {
      userid:payload.userid,
      role:user.role
    }
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = authmiddlware