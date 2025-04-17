



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import bookRouter from './routes/book.route.js';


dotenv.config();






const app = express();
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());



// app.use('/api/auth', authRouter);
// app.use('/api/book', bookRouter);
// app.use('/api/reader', readRouter);
// app.use('/api/review', reviewRouter);
// app.use('/api/connection', connectionRouter);







app.get('/', (req, res) => {
    res.send('Server is running')
})





app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})














