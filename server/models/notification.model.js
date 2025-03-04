import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{ timestamps: true });

const notificationModel = mongoose.model('Notification', notificationSchema );

export default notificationModel