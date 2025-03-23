import express from "express"
import { changeVisibility, deleteDocument, downVoteDoc, editDocment, getAllDoc, getDoc, newDocument, shearDoc, upvoteDoc } from "../controllers/docController.js";



const docRouter = express.Router()


docRouter.post("/new", newDocument)
docRouter.put("/edit", editDocment)
docRouter.delete("/delete", deleteDocument)
docRouter.patch("/visibility", changeVisibility)
docRouter.patch("/upvote", upvoteDoc)
docRouter.patch("/down-vote", downVoteDoc)
docRouter.get("/shear", shearDoc)
docRouter.get("/docs", getDoc)


// admin

docRouter.get("/docs/all", getAllDoc)


export default docRouter;