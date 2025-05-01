import express from "express";
import { createDocumentController, getAllDocumentTypeController} from "../controllers/document.controller.js";




const documentRouter = express.Router();


documentRouter.post("/create", createDocumentController);
documentRouter.get("/types", getAllDocumentTypeController);





export default documentRouter