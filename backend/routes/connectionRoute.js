import express from "express"
import { follow, followBack, getFriends, suggestPeople, unfollow } from "../controllers/connectionController.js";


const connectionRoute = express.Router()


connectionRoute.post("/follow", follow);
connectionRoute.patch("/follow-back", followBack)
connectionRoute.patch("/unfollow", unfollow)
connectionRoute.get("/suggest-people", suggestPeople)
connectionRoute.get("/friends", getFriends)





export default connectionRoute;