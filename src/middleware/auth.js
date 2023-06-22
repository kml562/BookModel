import jwt from 'jsonwebtoken'

export const authentication = function (req, res, next) {
    try{
    let headers=req.headers["x-api-key"]
    if(!headers){
       return res.status(400).send({status:false,msg:"header is required"})
    }
    let verifiedToken=jwt.verify(headers,"group4californium",(error,token)=>{
        if(error){
            
            return res.status(401).send({msg:error.message})
           
        }
      else
      {
        req.decodedToken=token;
        // return token
        next()
      }
        })
    

 }catch(error){
        return res.status(500).send({status:true,msg:error.message})
}
}