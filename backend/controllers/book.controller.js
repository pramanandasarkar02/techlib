import { Books } from "../data/data.js";


const getAllBooks = (req, res) => {
    // Logic to retrieve all books

    const book = Books

    res.status(200).json({ books: book });
}


const getBookById = (req, res) => {
    const { bookId } = req.params;

    // Logic to retrieve a specific book by ID

    const book = Books.find(book => book.id === parseInt(bookId));

    res.status(200).json({ book });
    
}


const createBook = (req, res) => {
    const { title, author, genre, publicationYear, publisher, price } = req.body;

    // Logic to handle book creation

    res.status(200).json({ message: `Book created: ${title}` });
}


const updateBook = (req, res) => {
    const { bookId } = req.params;
    const { title, author, genre, publicationYear, publisher, price } = req.body;

    // Logic to handle book update    

    res.status(200).json({ message: `Book updated: ${title}` });
}


const deleteBook = (req, res) => {
    const { bookId } = req.params;

    // Logic to handle book deletion    

    res.status(200).json({ message: 'Book deleted successfully' });
}


export { getAllBooks, getBookById, createBook, updateBook, deleteBook };