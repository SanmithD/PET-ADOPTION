import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
},{ timestamps: true });

const responseModel = mongoose.model('Response', responseSchema );

export default responseModel