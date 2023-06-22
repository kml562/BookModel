import express from "express";
const router = express.Router();

// POST /books/:bookId/review
// Add a review for the book in reviews collection.
// Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like this if the book does not exist
// Get review details like review, rating, reviewer's name in request body.
// Update the related book document by increasing its review count
// Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like this

export const= postReview = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


export default router;