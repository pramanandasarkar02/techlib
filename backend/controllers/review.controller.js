const comment = (req, res) => {
    const { bookId } = req.params;
    const { comment } = req.body;

    // Logic to handle commenting on a book

    res.status(200).json({ message: `Commented on book: ${bookId}` });
}

const getComments = (req, res) => {
    const { bookId } = req.params;

    // Logic to retrieve comments for a book

    res.status(200).json({ comments: comments });
}


const Like = (req, res) => {
    const { bookId } = req.params;

    // Logic to handle liking a book

    res.status(200).json({ message: `Liked book: ${bookId}` });
}


export { comment, getComments, Like };