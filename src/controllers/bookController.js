import { isValidObjectId } from "mongoose";
import { isValid } from "../utils/validatior/validatior";
import BookModel from "../model/bookModel.js";



export const createBooks = async (req, res) => {
    try {
        const { title, excerpt, userId, ISBN, category, subcategory, reviews } = req.body;
     
        if (!title || !excerpt || !userId || !category || !subcategory || !ISBN) {
            return res.status(400).json({ status: false, message: "fill all the required fields" });
        }
        if (!isValid(userId)) {
          return res.status(400).json({ status: false, message: "user Id invalid" });
        }
        if (!isValidObjectId(userId)) {
            return res
              .status(400)
              .json({ status: false, messsage: "please provide valid user Id" });
        }
        
      const  bookData= req.body
       bookData.isDeleted = false ;
        // when book is created then it will be released-----------------------------------------
        bookData.releasedAt = moment().format("YYYY-MM-DD");
        const checkbook = await BookModel.findOne({ $or: [{ title: title }, { ISBN: ISBN }], });
        if (checkbook) {
            return res.status(400).json({ status: false, messsage: "book already exists" })
        }
        const data = await BookModel.create(bookData);
        res.status(201).json({ status: true, data: data })

 } catch (error) {
        res.status(500).json({error:error.message});
    }
}




