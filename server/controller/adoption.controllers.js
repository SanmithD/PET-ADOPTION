import 'dotenv/config';
import jwt from 'jsonwebtoken';
import adoptionModel from '../models/adoption.model.js';

const makeAdoption = async(req, res) =>{
    const { userName, breed, phoneNumber, email, message, address } = req.body
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!token){
        return res.status(403).json({
            success: false,
            message: "Unauthorized access"
        });
    }
    try {
        if(!userName || !breed || !phoneNumber || !email || !message || !address){
            return res.status(400).json({
                success: false,
                message: "Error"
            });
        };
        const { name } = jwt.verify(token, JWT);
        const adopt = new adoptionModel({
            userName,
            breed,
            phoneNumber,
            email,
            message,
            address
        });
        await adopt.save();
        res.status(200).json({
            success: true,
            message: "Adoption Done",
            adopt,
            name
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

const getAllAdoption = async(req, res) =>{
    try {
        const response = await adoptionModel.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "No adoption request"
            });
        };
        res.status(200).json({
            success: true,
            message: "All Adoption Request",
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

const getUserAdoption = async(req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        const response = await adoptionModel.findById(id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Not found Adoption"
            });
        }
        res.status(200).json({
            success: true,
            message: "Adoption request",
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

const rejectRequest = async(req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(404).json({
            success: false,
            message: "Invalid id"
        });
    }
    try {
        const response = await adoptionModel.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Not found Adoption"
            });
        }
        res.status(200).json({
            success: true,
            message: "Request rejected",
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

export { getAllAdoption, getUserAdoption, makeAdoption, rejectRequest };
