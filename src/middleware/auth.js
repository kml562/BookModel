import jwt from "jsonwebtoken";

export const authentication = (req, res, next)=> {
  try {
   
      const headers = req.headers["x-api-key"];
      const { JWT_SECRET } = process.env;
    if(!headers){
       return res.status(400).json({status:false,msg:"header is required"})
    }
jwt.verify(headers,JWT_SECRET,(error,token)=>{
        if(error){
            
            return res.status(401).json({msg:error.message})
           
        }
      else
      {
          req.decodedToken = token;
          console.log(req.decodedToken);
     // set tokin in req --------------------------------------------------------------------------------------
        next()
      }
        })
    

 }catch(error){
        return res.status(500).json({status:true,msg:error.message})
}
}