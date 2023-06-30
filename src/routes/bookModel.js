import express from "express";
import { createBooks, deletedbyId, getbookId, getbooks, updateBook } from "../controllers/bookController.js";
import { authentication } from "../middleware/auth.js";
import { authorization } from "../middleware/authrzation.js";
import AWS from "aws-sdk";

const router = express.Router();
AWS.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})


router.post("/books", authentication, createBooks);
router.get("/books", authentication, getbooks);

router.get("/books/:bookId", authentication, getbookId);
router.put("/books/:bookId", authentication, authorization, updateBook);
router.delete("/books/:bookId", authentication, authorization, deletedbyId);
export default router;
