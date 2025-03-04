import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    userMsg: [
        {
            userId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            contactImage: {
                type: String
            },
            replies: [
                {
                    userId: {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    message: {
                        type: String,
                        required: true
                    },
                    replyImage: {
                        type: String
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
        }
    ]
}, { timestamps: true });

const contactModel = mongoose.model('contact', contactSchema);

export default contactModel;