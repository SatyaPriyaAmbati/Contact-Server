const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require('dotenv').config();
const registerUser=asyncHandler(async(req,res)=>{
const{username,address,password}=req.body;
if(!username || !address ||!password)
{
  res.status(400);
  throw new Error("All are mandatory");
}
const userAvaliable= await User.findOne({address});
if(userAvaliable)
{
  res.status(400);
  throw new Error("User Already registred");
}
//hasg password
const hashedPassword=await bcrypt.hash(password,10);
console.log("hashed password:",hashedPassword);
const user=await User.create({
  username,
  address,
  password:hashedPassword,
});
console.log(`user created ${user}`);
if(user)
{
  res.status(201).json({_id: user.id,address:user.address});
}
else{
  res.status(400);
  throw new Error("user data is not valid");
}
res.json({message:"reg the user"});
});



const loginUser=asyncHandler(async(req,res)=>{
  const {address,password}=req.body;
  if(!address || !password)
  {
    res.status(400);
    throw new Error("all should require");
  }
  const user=await User.findOne({address});
  //compare passwd to the hashed passwd
  if (user && (await bcrypt.compare(password, user.password))){
    const accessToken=jwt.sign({
      user:{
        username:user.username,
        address:user.address,
        id:user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"}
  );
    res.status(200).json({accessToken});
  }
  else{
    res.status(401)
    throw new Error("email address or password is not valid");
  }
});


const currentUser=asyncHandler(async(req,res)=>{
  res.json(req.user);
});



module.exports={registerUser,loginUser,currentUser}