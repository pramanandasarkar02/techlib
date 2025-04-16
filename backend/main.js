



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import bookRouter  from './routes/book.js'; 

connectDB();



const app = express();
const port = process.env.PORT 


app.use(cors());
app.use(express.json());




app.use('/api/books', bookRouter);



app.get('/', (req, res) => {
    res.send('Server is running')
})





app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})














