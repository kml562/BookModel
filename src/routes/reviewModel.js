import express from "express";
import {
  deleteReview,
  postReview,
  updateReview,
} from "../controllers/reviewController.js";
const router = express.Router();

router.post("/books/:bookId/review", postReview);
router.put("/books/:bookId/review/:reviewId", updateReview);
router.delete("/books/:bookId/review/:reviewId", deleteReview);

export default router;
