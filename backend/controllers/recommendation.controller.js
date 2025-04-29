import { pgClient } from "../config/postgresdb.js";


const getRecommendation = (req, res) => {
    const { userId } = req.params;

    // Logic to retrieve recommended books for a user

    const recommendedBooks = Books;

    res.status(200).json({ recommendedBooks });
}



const getNew = (req, res) => {
    const { userId } = req.params;

    // Logic to retrieve new books for a user   

    const newBooks = Books;

    res.status(200).json({ newBooks });
}



const getTrending = (req, res) => {
    // Logic to retrieve trending books

    // query to find the document most like * 2 and upvote * 10 . 
    
    
}   

export { getRecommendation, getNew, getTrending }
