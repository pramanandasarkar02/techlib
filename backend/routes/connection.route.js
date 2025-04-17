import express from 'express'
import { follow, unfollow } from '../controllers/connection.controller'

const connectionRouter = express.Router()


connectionRouter.get("/:id", follow)
connectionRouter.put("/:id", unfollow)
connectionRouter.get("/follower/:id", )
connectionRouter.get("/following/:id", )


export default connectionRouter