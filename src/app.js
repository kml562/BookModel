import express from "express";
const app = express();
import Bookrouter from "./routes/bookModel.js";
import UserRouter from "./routes/userModel.js";
import reviewRouter from "./routes/reviewModel.js";
import multer from "multer";
// global middleware----------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

app.use("/book", Bookrouter);
app.use("/user", UserRouter);
app.use("/review", reviewRouter);

export default app;
