import express from "express";
import { getNew, getRecommendation, getTrending } from "../controllers/recommendation.controller.js";


const recommendationRouter = express.Router();





recommendationRouter.get("/:userId", getRecommendation);
recommendationRouter.get("/trending/:userId", getTrending);
recommendationRouter.get("/new/:id", getNew);






export default recommendationRouter