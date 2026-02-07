const express = require('express')
const errorHandler = require('./middlewares/errormiddleware')
const userrouter = require('./controllers/user_cnt')
const mongoose = require('mongoose')
const app = express()

//?connecting to the database
if(mongoose.connect(process.env.MONGO_URI)){
  console.log("Connected to the database");
}
else{
  console.log("Couldn't connect to the database");
}
app.use(express.json())
app.get('/',(req,res)=>{
  res.send("Welcome to the Subscription Backend")
})
app.use('/api/user',userrouter)
app.use(errorHandler)

module.exports = app