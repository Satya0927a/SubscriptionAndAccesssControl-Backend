const userModel = require("../models/userModel")

const adminmiddleware = async(req,res,next)=>{
  try {
    const role = req.user.role
    if(role=='user'){
      return res.status(403).send({
        success:false,
        message:"Forbidden"
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminmiddleware