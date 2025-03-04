import express from 'express';
import { deleteUser, getAllUser, getUserById, login, signup, updateUser } from '../controller/user.controllers.js';
import upload from '../middleware/multer.middleware.js';
import { loginMiddleware, signupMiddleware } from '../middleware/signup.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', upload.single('profileImage'), signupMiddleware, signup );
userRouter.post('/login', loginMiddleware, login );
userRouter.get('/getAllUser', getAllUser);
userRouter.get('/getUserById', getUserById);
userRouter.put('/updateUser', upload.single('profileImage'), updateUser);
userRouter.delete('/deleteUser', deleteUser);

export default userRouter;
