import express from "express"
import { findDocBYType, findRelativeDocument, suggestDocument } from "../controllers/searchController.js";


const searchRouter = express.Router()

searchRouter.get("/suggest", suggestDocument)
searchRouter.get("/relative-doc", findRelativeDocument)
searchRouter.get("/:type/doc", findDocBYType)



export default searchRouter;