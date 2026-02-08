const mongoose = require('mongoose')

const planschema = new mongoose.Schema({
  planName:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  access:{
    genChat:{
      type:Boolean,
      default:true
    },
    genImage:{
      type:Boolean,
      default:false
    },
    genVideo:{
      type:Boolean,
      default:false
    }
  },
  limits:{
    MaxgenChatTokens:{
      type:Number,
      required:true
    },
    MaxgenImage:{
      type:Number,
      required:true
    },
    MaxgenVideo:{
      type:Number,
      required:true
    }
  }
})

const planModel = new mongoose.model("Plan",planschema)
module.exports = planModel