import express from 'express'
import { follow, getFollower, getFollowing, unfollow } from '../controllers/connection.controller.js'

const connectionRouter = express.Router()


connectionRouter.get("/:id", follow)
connectionRouter.put("/:id", unfollow)
connectionRouter.get("/follower/:id", getFollower)
connectionRouter.get("/following/:id", getFollowing)


export default connectionRouter