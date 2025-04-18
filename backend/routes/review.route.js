import express from "express";
import { comment, getComments, Like } from "../controllers/review.controller.js";


const reviewRouter = express.Router();



reviewRouter.get("/comment/:bookId", getComments);
reviewRouter.post("/comment/:bookId", comment);
reviewRouter.put("/:bookId/:userId/like", Like);





export default reviewRouter
