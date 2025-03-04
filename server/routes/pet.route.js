import express from 'express';
import { deletePetById, getAllPet, getPetById, postPet, updatePet } from '../controller/pet.controllers.js';
import upload from '../middleware/multer.middleware.js';

const petRouter = express.Router();

petRouter.post('/postPet', upload.single('petImage'), postPet );
petRouter.put('/updatePet/:id', upload.single('petImage'), updatePet );
petRouter.get('/getAllPet', getAllPet );
petRouter.get('/getPetById/:id', getPetById );
petRouter.delete('/deletePet/:id', deletePetById );

export default petRouter
