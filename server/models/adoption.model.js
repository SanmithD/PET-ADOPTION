import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    },
    address: {
        type: String,
        required: true
    }
},{ timestamps: true });

const adoptionModel = mongoose.model('adoption', adoptionSchema );

export default adoptionModel;