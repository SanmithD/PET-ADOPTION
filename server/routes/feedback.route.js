import express from 'express';
import { deleteAllFeedback, deleteFeedback, feedbackController, getFeedbacks, getSingleFeedback } from '../controller/feedback.controllers.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/postFeedback', feedbackController);
feedbackRouter.get('/getAllFeedbacks', getFeedbacks);
feedbackRouter.get('/getSingleFeedback/:id', getSingleFeedback);
feedbackRouter.delete('/deleteAllFeedbacks', deleteAllFeedback);
feedbackRouter.delete('/deleteSingleFeedback/:id', deleteFeedback);

export default feedbackRouter

