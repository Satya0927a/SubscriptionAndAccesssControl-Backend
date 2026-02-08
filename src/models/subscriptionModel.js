const mongoose = require('mongoose')

const subscriptionschema = new mongoose.Schema({
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
  },
  plan:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Plan",
    required:true
  },
  usage:{
    genChatTokens:{
      type:Number,
      default:0
    },
    genImage:{
      type:Number,
      default:0
    },
    genVideo:{
      type:Number,
      default:0
    }
  },
  status:{
    type:String,
    enum:['active','expired','cancelled'],
    default:'active'
  },
  startDate:{
    type:Date,
    default:Date.now
  },
  endDate:{
    type:Date
  }
})

const subscriptionModel = new mongoose.model("Subscription",subscriptionschema)

module.exports = subscriptionModel