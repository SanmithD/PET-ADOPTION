import bodyParser from 'body-parser';
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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "https://pet-adoption-nlfv.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: process.env.CLIENT_URL || "https://pet-adoption-nlfv.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
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