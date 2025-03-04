import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 15
    },
    phone_number: {
        type: String, 
        required: true,
        match: /^\d{10}$/
    },
    message: {
        type: String,
        maxlength: 500,
        trim: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true }
});

const donationModel = mongoose.model('Donation', donationSchema); 
export default donationModel;