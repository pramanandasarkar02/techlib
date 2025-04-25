import express from "express";
import { createBook, deleteBook, getAllBooks, getAllDocumentTypes, getAllGenres, getBookById, updateBook } from "../controllers/book.controller.js";


const bookRouter = express.Router();



bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/genre/all", getAllGenres);
bookRouter.get("/type/all", getAllDocumentTypes);



export default bookRouter