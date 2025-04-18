import express from "express";
import { getNew, getRecommendation, getTrending } from "../controllers/recommendation.controller.js";


const recommendationRouter = express.Router();





recommendationRouter.get("/:id", getRecommendation);
recommendationRouter.get("/trending/:id", getTrending);
recommendationRouter.get("/new/:id", getNew);






export default recommendationRouter