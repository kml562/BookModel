import BookModel from "../model/bookModel.js"
import { isValid } from "../utils/validatior/validatior"


 export const authorization=async function(req,res,next){
    try{
    let tokenUser=req.decodedToken.userId
    let bookId=req.params.bookId
    if(!isValid(bookId)) return res.status(400).send({status:false,msg:"Invalid bookId"})
    let book=await BookModel.findOne({_id:bookId,isDeleted:false}) //-----// isDeleted added
    if(!book){
        return res.status(404).send({status:false,msg:"No books found with this bookId"})
    }
    let userId=book["userId"].toString()
    // console.log(userId)
   
    if(userId!=tokenUser){
        return res.status(403).send({msg:"You are not authorized"})   
    }
    next()
}catch(error){
    return res.status(500).send({status:false,msg:error.message})

}
}