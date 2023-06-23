import BookModel from "../model/bookModel.js"
import { isValid } from "../utils/validatior/validatior.js"


 export const authorization=async function(req,res,next){
    try{
   const tokenUser=req.decodedToken.id
   const bookId=req.params.bookId
        if (!isValid(bookId)) return res.status(400).json({ status: false, message: "Invalid bookId" })
   // isDeleted added and checking fo the key is deleted or not------------------------------------
        const book = await BookModel.findById(bookId).where('isDeleted').equals(false); 
    if(!book){
        return res.status(404).json({status:false,message:"No books found with this bookId"})
    }
   const userId=book["userId"].toString()
   console.log(userId,tokenUser)
    if(userId!=tokenUser){
        return res.status(403).json({message:"You are not authorized"})   
    }
    next()
}catch(error){
    return res.status(500).json({status:false,message:error.message})

}
}