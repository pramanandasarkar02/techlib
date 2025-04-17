import express from "express";
import { comment, getComments, Like } from "../controllers/review.controller.js";


const reviewRouter = express.Router();



reviewRouter.get("/:bookId", getComments);
reviewRouter.post("/:bookId", comment);
reviewRouter.put("/:reviewId/like", Like);





export default reviewRouter
