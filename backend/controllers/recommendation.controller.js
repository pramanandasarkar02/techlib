import { Books, Users } from "../data/data.js";


const getRecommendation = (req, res) => {
    const { userId } = req.params;

    // Logic to retrieve recommendations for a user 

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

    const trendingBooks = Books;    

    res.status(200).json({ trendingBooks });    
}   

export { getRecommendation, getNew, getTrending }
