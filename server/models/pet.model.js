import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    petImage: {
        type: String,
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    petNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

const petModel = mongoose.model('pet', petSchema );

export default petModel;