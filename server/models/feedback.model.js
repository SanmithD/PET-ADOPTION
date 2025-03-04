import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
}, { timestamps: true });

const feedbackModel = mongoose.model('feedback', feedbackSchema );

export default feedbackModel;