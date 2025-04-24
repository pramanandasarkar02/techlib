import { Books } from "../data/data.js";

// import * as bookModel from '../models/bookModel.js'


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



 // controllers/genresController.js
const genres = [
    "Java",
    "Python",
    "C",
    "C++",
    "JavaScript",
    "Go",
    "Rust",
    "System Design",
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Databases",
    "Networking",
    "Operating Systems",
    "Security",
  ];
  
  const documentTypes = [
    "Book",
    "Journal",
    "Magazine",
    "Newspaper",
    "E-Book",
    "Audio Book",
  ];
  
  const getAllGenres = async (req, res) => {
    try {
      // Log request details for debugging
    //   console.log("Request URL:", req.originalUrl);
    //   console.log("Genres array:", genres);
  
      // Validate query parameters
      if (Object.keys(req.query).length > 0) {
        // console.log("Invalid query parameters:", req.query);
        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
        });
      }
  
      // Prepare and log response
      const response = {
        success: true,
        message: "Genres retrieved successfully",
        data: { genres },
      };
    //   console.log("Response:", response);
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in getAllGenres:", error);
      
    }
  };
  
  const getAllDocumentTypes = async (req, res, ) => {
    try {
      // Log request details for debugging
    //   console.log("Request URL:", req.originalUrl);
    //   console.log("DocumentTypes array:", documentTypes);
  
      // Validate query parameters
      if (Object.keys(req.query).length > 0) {
        // console.log("Invalid query parameters:", req.query);
        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
        });
      }
  
      // Prepare and log response
      const response = {
        success: true,
        message: "Document types retrieved successfully",
        data: { documentTypes },
      };
    //   console.log("Response:", response);
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in getAllDocumentTypes:", error);
      
    }
  };

export { getAllBooks, getBookById, createBook, updateBook, deleteBook, getAllGenres, getAllDocumentTypes };