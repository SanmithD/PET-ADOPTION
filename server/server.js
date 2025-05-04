import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './db.js';
import adoptRouter from './routes/adoption.route.js';
import contactRouter from './routes/contact.route.js';
import donationRouter from './routes/donation.route.js';
import feedbackRouter from './routes/feedback.route.js';
import notificationRouter from './routes/notification.route.js';
import petRouter from './routes/pet.route.js';
import userRouter from './routes/user.route.js';

connectDB();
const app = express();
app.use(cors({
    origin: ["https://pet-adoption-front.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));
  
app.use(bodyParser.json());
const PORT = process.env.PORT || 7000

app.use('/api/user', userRouter);
app.use('/api/feedback', feedbackRouter );
app.use('/api/contact', contactRouter );
app.use('/api/donation', donationRouter );
app.use('/api/adoption', adoptRouter );
app.use('/api/notification', notificationRouter );
app.use('/api/pet', petRouter );


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`server running on port ${PORT}`);
});