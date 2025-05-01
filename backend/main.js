



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

import readerRouter from './routes/reader.route.js';
import reviewRouter from './routes/review.route.js';
import connectionRouter from './routes/connection.route.js';
import writerRouter from './routes/writer.route.js';
import recommendationRouter from './routes/recommendation.route.js';
import initializePostgresDb from './config/initPostgressDb.js';
import adminUserRouter from './routes/admin/user.route.js';
import adminDocumentRouter from './routes/admin/document.route.js';
import documentRouter from './routes/document.route.js';


dotenv.config();

initializePostgresDb();






const app = express();
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/document', documentRouter);
app.use('/api/v1/reader', readerRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/connection', connectionRouter);
app.use("/api/v1/writer", writerRouter)
app.use("/api/v1/recommendations", recommendationRouter)





app.use("/api/v1/admin/users", adminUserRouter)
app.use("/api/v1/admin/documents", adminDocumentRouter)







app.get('/api', (req, res) => {
    res.send('api is working');
})





app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})














