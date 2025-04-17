import express from "express";
import { collectedBooks, getReaderInformation } from "../controllers/reader.controller.js";


const readerRouter = express.Router();



readerRouter.get("/:id", getReaderInformation);
readerRouter.get("/:id/books",collectedBooks); 




export default readerRouter