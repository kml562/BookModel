import express from "express";
import { createBooks, deletedbyId, getbookId, getbooks, updateBook } from "../controllers/bookController.js";

import { authentication } from "../middleware/auth.js";
import { authorization } from "../middleware/authrzation.js";
const router = express.Router();

router.post('/books',authentication ,createBooks);
router.get('/books', authentication, getbooks);

router.get('/books/:bookId', authentication,getbookId);
router.put('/books/:bookId',authentication ,authorization,updateBook);
router.delete('/books/:bookId',authentication,authorization,deletedbyId );
export default router;