import 'dotenv/config';
import jwt from 'jsonwebtoken';
import donationModel from "../models/donation.model.js";

const makeDonation = async (req, res) => {
    const { name, phone_number, message } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: "Authentication required"
        });
    }

    try {
        jwt.verify(token, process.env.SECRET);

        const donation = new donationModel({
            name,
            phone_number,
            message
        });

        const savedDonation = await donation.save();
        return res.status(201).json({
            success: true,
            message: "Thank you for your donation",
            donation: savedDonation
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        console.error('Donation error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getAllDonationInfo = async (req, res) => {
    try {
        const donations = await donationModel.find()
            .sort({ createdAt: -1 });  // Sort by latest first
        return res.status(200).json({
            success: true,
            message: "All donations",
            count: donations.length,
            donations
        });
    } catch (error) {
        console.error('Get all donations error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

const getSingleDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid donation ID format"
        });
    }

    try {
        const donation = await donationModel.findById(id);
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Donation found",
            donation
        });
    } catch (error) {
        console.error('Get single donation error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export { getAllDonationInfo, getSingleDonation, makeDonation };
