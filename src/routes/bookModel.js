import express from "express";
import { createBooks, deletedbyId, getbookId, getbooks, updateBook } from "../controllers/bookController.js";
const router = express.Router();

router.post('/books', createBooks);
router.get('/books', getbooks);
router.get('books/:bookId', getbookId);
router.post('books/:bookId', updateBook);
router.delete('books/:bookId',deletedbyId );
export default router;