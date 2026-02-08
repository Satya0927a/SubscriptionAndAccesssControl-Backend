const isValidEmail = require("../utilis/functions")

const validateUserInput = (req,res,next)=>{
  try {
    const {username,email,password} = req.body
    if(username){
      if(username.length < 3){
        return res.status(400).send({
          success:false,
          message:"The length of username must be atleast 2 char long"
        })
      }
    }
    if(email){
      if(!isValidEmail(email)){
        return res.status(400).send({
          success:false,
          message:"Invalid Email format"
        })
      }
    }
    if(password){
      if(password.length < 8){
        return res.status(400).send({
          success:false,
          message:"password length must be greater than 8"
        })
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateUserInput