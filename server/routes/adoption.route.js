import express from 'express';
import { getAllAdoption, getUserAdoption, makeAdoption, rejectRequest } from '../controller/adoption.controllers.js';
import adoptionMiddleware from '../middleware/adoption.middleware.js';

const adoptRouter = express.Router();

adoptRouter.post('/makeRequest', adoptionMiddleware, makeAdoption );
adoptRouter.get('/getAllRequest', getAllAdoption );
adoptRouter.get('/getSingleRequest/:id', getUserAdoption );
adoptRouter.delete('/rejectRequest/:id', rejectRequest );

export default adoptRouter;

