import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    profileImage: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const signupModel = mongoose.model('user', signupSchema );
export default signupModel