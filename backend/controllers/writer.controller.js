const getPublishedBook = (req, res) => {
    const { userId } = req.params;

    // Logic to retrieve published books by a writer    
    const publishedBooks = Users[parseInt(userId) - 1].publishedBooks;
    res.status(200).json({ publishedBooks });

}



export { getPublishedBook };