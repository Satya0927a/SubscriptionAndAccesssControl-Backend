const app = require('./src/app')

const port = 3000 || process.env.PORT
app.listen(port,()=>{
  console.log(`the server is running on port ${port}`);
})