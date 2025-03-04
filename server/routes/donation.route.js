import express from 'express';
import { getAllDonationInfo, getSingleDonation, makeDonation } from '../controller/donation.controllers.js';
import donationMiddleware from '../middleware/donation.middleware.js';

const donationRouter = express.Router();

donationRouter.post('/makeDonation', donationMiddleware, makeDonation );
donationRouter.get('/getAllDonation', getAllDonationInfo );
donationRouter.get('/getUserDonation/:id', getSingleDonation );

export default donationRouter