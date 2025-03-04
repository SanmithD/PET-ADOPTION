import 'dotenv/config';
import jwt from 'jsonwebtoken';
import feedbackModel from '../models/feedback.model.js';

const feedbackController = async(req, res)=>{
    const { feedback } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!token){
        return res.status(404).json({
            success: false,
            message: "Invalid token"
        });
    };
    try {
        const { id, name } = jwt.verify(token, JWT);
        if(!id){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        };
        const feedbackMsg = new feedbackModel({
            userId : id,
            userName: name,
            feedback
        });
        await feedbackMsg.save();
        res.status(200).json({
            success: true,
            message: "Feedback send",
            feedbackMsg
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const getFeedbacks = async(req, res)=>{
    try {
        const response = await feedbackModel.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "feedback not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "All feedbacks",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const getSingleFeedback = async(req, res)=>{
    const { _id } = req.params;
    if(!_id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    };
    try {
        const response = await feedbackModel.findById({ _id });
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "success",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const deleteFeedback = async(req, res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid feedback"
        });
    };
    try {
        const response = await feedbackModel.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Feedback deleted Successfully",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const deleteAllFeedback = async(req, res) =>{
    try {
        const response = await feedbackModel.deleteMany();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "empty feedback"
            });
        }
        res.status(200).json({
            success: true,
            message: "All feedbacks deleted",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export { deleteAllFeedback, deleteFeedback, feedbackController, getFeedbacks, getSingleFeedback };
