import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import signupModel from "../models/signup.model.js";

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const profile = req.file ? req.file.path : null;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter all details",
        });
    }

    try {
        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists, Please login",
            });
        }

        const newPass = await bcrypt.hash(password, 10);
        const newUser = new signupModel({
            profileImage: profile,
            name,
            role: 'user',
            email,
            password: newPass,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            user: newUser,
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const updateUser = async(req, res) =>{
    const { name, email } = req.body;
    const profile = req.file ? req.file.path : null;

    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!name || !email ){
        return res.status(400).json({
            success: false,
            message: "Please enter details"
        });
    };
    
    try {
        const user = jwt.verify(token, JWT);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const updateRepo = await signupModel.findByIdAndUpdate(user.id,{
            profileImage: profile,
            name,
            email,
        },{ new: true });

        return res.status(200).json({
            success: true,
            message: "Update successful",
            updateRepo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter details",
        });
    }

    try {
        const user = await signupModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist, Please signup",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect details",
            });
        }

        const token = jwt.sign(
            { name: user.name, email: user.email, id: user._id },
            process.env.SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful", 
            userId: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            token,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

const getAllUser = async(req, res) =>{
    try {
        const users = await signupModel.find();
        if(!users){
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        };
        return res.status(200).json({
            success: true,
            message: "All users",
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const getUserById = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;

    if(!token){
        return res.status(404).json({
            success: false,
            message: "Invalid token"
        });
    }
    try {
        const { id } = jwt.verify(token, JWT);
        if(!id){
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        }
        const user = await signupModel.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const deleteUser = async(req, res) =>{
    const token = req.headers.authorization?.split(" ")[1];
    const JWT = process.env.SECRET;
    if(!token){
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }
    try {
        const { id } = jwt.verify(token, JWT);
        const user = await signupModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const resetPassword = async(req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Enter Details"
        });
    };

    try {
        const user = await signupModel.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exits"
            });
        };
        const hashedNewPass = await bcrypt.hash(password, 10);
        if(!hashedNewPass){
            return res.status(400).json({
                success: false,
                message: "Failed to reset the password"
            });
        };
        const changedPassword = await signupModel.findOneAndUpdate({ email },{
            password: hashedNewPass
        },{ new: true });
        res.status(200).json({
            success: true,
            message: "Password Changed"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    }
}

export { deleteUser, getAllUser, getUserById, login, resetPassword, signup, updateUser };

