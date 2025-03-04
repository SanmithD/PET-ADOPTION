import express from 'express';
import { deleteMsg, deleteReply, getAllMsg, getOwnUserMsg, getReplies, getUserMsg, postMessage, postReply } from '../controller/contact.controllers.js';
import upload from '../middleware/multer.middleware.js';

const contactRouter = express.Router();

contactRouter.post('/postMessage', upload.single("contactImage"), postMessage);
contactRouter.get('/getAllMsg', getAllMsg);
contactRouter.get('/getUserMsg/:id', getUserMsg);
contactRouter.get('/getOwnMsg', getOwnUserMsg);
contactRouter.delete('/deleteMsg/:id', deleteMsg);
contactRouter.post('/messages/:messageId/replies', upload.single('replyImage'), postReply);
contactRouter.get('/messages/:messageId/replies', getReplies);
contactRouter.delete('/messages/:messageId/replies/:replyId', deleteReply);

export default contactRouter;