import express from 'express'
import { getPublishedBook } from '../controllers/writer.controller.js';


const writerRouter = express.Router();


writerRouter.get("/", getPublishedBook);



export default writerRouter

