const { Timestamp } = require("mongodb");
const mongoose=require("mongoose");


const contactSchema=mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  },
  name:{
    type:String,
    required:[true,"please add the contact name"],
  },
  address:{
   type:String,
   required:[true,"please add the contact address"],
  },
  phone:{
    type:String,
    required:[true,"please add the contact phone number"],
  },
},
{
  timestamps:true,
}
);
module.exports=mongoose.model("Contact",contactSchema);