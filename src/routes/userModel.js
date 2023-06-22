import express from "express";
import { createUser, login } from "../controllers/userController.js";
const router = express.Router();

router.post('/register', createUser);

router.post('/login',login)




export default router;

// POST /register
// Create a user - atleast 5 users
// Create a user document from request body.
// Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like this
// Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like this