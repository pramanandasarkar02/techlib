import { Books } from "../data/data.js";

import * as bookModel from '../models/bookModel.js'


const getAllBooks = async (req, res) => {
    // Logic to retrieve all books

    const books = await bookModel.getAllBooks();

    res.status(200).json({ books });
}


const getBookById = async (req, res) => {
    const { bookId } = req.params;

    // Logic to retrieve a specific book by ID

    // const book = Books.find(book => book.id === parseInt(bookId));
    const book = await bookModel.getBookById(bookId);

    res.status(200).json({ book });
    
}


const createBook = async (req, res) => {
    const { title, author, genre, publicationYear, publisher, price } = req.body;

    const newBook = await bookModel.createBook({
        title,
        author,
        genre,
        publicationYear,
        publisher,
        price
    });


    // Logic to handle book creation

    res.status(200).json({ message: `Book created: ${title}`, book: newBook });
}


const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, author, genre, publicationYear, publisher, price } = req.body;

    // Logic to handle book update    
    const updatedBook = await bookModel.updateBook(bookId, {
        title,
        author,
        genre,
        publicationYear,
        publisher,
        price
    })

    res.status(200).json({ message: `Book updated: ${updatedBook}` });
}


const deleteBook = async (req, res) => {
    const { bookId } = req.params;

    // Logic to handle book deletion  

    await bookModel.deleteBook(bookId);  

    res.status(200).json({ message: 'Book deleted successfully' });
}


export { getAllBooks, getBookById, createBook, updateBook, deleteBook };