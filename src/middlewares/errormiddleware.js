const errorHandler = (err,req,res,next)=>{
  console.log(err);
  if(err.name == "MongoServerError"){
    res.status(403).send({
      success:false,
      message:"An Account already exists for this email account"
    })
  }
  else{
    res.status(500).send({
      success:false,
      message:"Server Error"
    })
  }
}
module.exports = errorHandler