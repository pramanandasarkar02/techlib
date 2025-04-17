import { Users } from "../data/data.js";


const getReaderInformation = (req, res) => {
    const {userId} = req.params.id
    
    // Logic to retrieve reader information


    const readerInformation = Users[parseInt(userId) - 1];

    res.status(200).json({ readerInformation });


    
}


const collectedBooks = (req, res) => {
    const {userId} = req.params.id

    // Logic to retrieve collected books

    const collectedBooks = Users[parseInt(userId) - 1].collectedBooks;

    res.status(200).json({ collectedBooks });
}

export { getReaderInformation, collectedBooks };