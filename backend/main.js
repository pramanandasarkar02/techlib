



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import bookRouter from './routes/book.route.js';
import readerRouter from './routes/reader.route.js';
import reviewRouter from './routes/review.route.js';
import connectionRouter from './routes/connection.route.js';
import writerRouter from './routes/writer.route.js';


dotenv.config();






const app = express();
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());



app.use('/api/auth', authRouter);
app.use('/api/book', bookRouter);
app.use('/api/reader', readerRouter);
app.use('/api/review', reviewRouter);
app.use('/api/connection', connectionRouter);
app.use("/api/writer", writerRouter)







app.get('/api', (req, res) => {
    res.send('api is working');
})





app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})














