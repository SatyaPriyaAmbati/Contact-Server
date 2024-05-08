const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken=asyncHandler(async(req,res,next)=>{
  let auth=req.headers.Authorization || req.headers.authorization;
  if(auth && auth.startsWith("Bearer")){
    token=auth.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
       if(err){
        res.status(401);
        throw new Error("user is not authorized");
       }
       req.user=decoded.user;
       next();
    });
    if(!token)
    {
      res.status(401);
      throw new Error("user is not authrozied");
    }
  }
});

module.exports=validateToken;