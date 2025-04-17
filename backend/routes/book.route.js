import express from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.controller.js";


const bookRouter = express.Router();



bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);



export default bookRouter