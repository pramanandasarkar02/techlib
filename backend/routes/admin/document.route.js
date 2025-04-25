import express from "express";
import { getAllDocumentsController, getDocumentByIdController } from "../../controllers/admin/document.controller.js";




const adminDocumentRouter = express.Router();


adminDocumentRouter.get("/", getAllDocumentsController);
adminDocumentRouter.get("/:id", getDocumentByIdController);



export default adminDocumentRouter