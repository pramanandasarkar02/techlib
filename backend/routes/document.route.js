import express from "express";
import { createDocumentController, getAllDocumentTypeController, getDownloadedDocumentsController, getLikedDocumentsController, getSavedDocumentsController} from "../controllers/document.controller.js";





const documentRouter = express.Router();


documentRouter.post("/create", createDocumentController);
documentRouter.get("/types", getAllDocumentTypeController);

documentRouter.get("/saved/:userId", getSavedDocumentsController);
documentRouter.get("/liked/:userId", getLikedDocumentsController);
documentRouter.get("/downloaded/:userId", getDownloadedDocumentsController);





export default documentRouter