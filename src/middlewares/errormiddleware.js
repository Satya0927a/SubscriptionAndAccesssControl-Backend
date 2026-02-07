const errorHandler = (err,req,res,next)=>{
  console.log(err.name);
  res.status(500).send({
    success:false,
    message:"Server Error"
  })
}
module.exports = errorHandler