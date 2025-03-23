import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import notificationModel from "../models/notification.model.js";
import responseModel from '../models/response.model.js';

const pushNotification = async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      success: false,
      message: "Please enter details",
    });
  }
  try {
    const response = new notificationModel({
      title,
      message,
    });
    await response.save();
    res.status(200).json({
      success: true,
      message: "Notification Sended",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};


const getAllNotification = async (req, res) => {
  try {
    const response = await notificationModel.find();
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Empty notification",
      });
    }
    res.status(200).json({
      success: true,
      message: "All notifications",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const getSingleNotification = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const response = await notificationModel.findById(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Cannot find notification",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const deleteNotification = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }
  try {
    const response = await notificationModel.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const deleteAllNotification = async (req, res) => {
  try {
    const response = await notificationModel.deleteMany();
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Notifications not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Notifications Deleted",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Server error",
    });
    console.log(error);
  }
};

const updateNotification = async (req, res) => {
  const { title, message } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid id",
    });
  }

  try {
    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Please enter details",
      });
    }
    const response = await notificationModel.findByIdAndUpdate(
      id,
      {
        title,
        message,
      },
      { new: true }
    );
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Notification not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Notification updated",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    console.log(error);
  }
};

const pushNotificationToId = async(req, res) =>{
  const { id } = req.params;
  const { title, message } = req.body;

  if(!id){
    return res.status(400).json({
      success: false,
      message: 'Invalid id'
    });
  };
  try {
    const adoptionNotification = new responseModel({
      userId : id,
      title,
      message,
    });
    if(!adoptionNotification){
      return res.status(400).json({
        success: false,
        message: 'Failed to push Notification'
      });
    };
    await adoptionNotification.save();
    res.status(200).json({
      success: true,
      message: 'Notification Posted',
      adoptionNotification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
    console.log(error);
  }
}

const getOwnNotification = async(req, res) =>{
  const token = req.headers.authorization?.split(" ")[1];
  const JWT = process.env.SECRET;

  if(!token){
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });
  }
  try {
    const { id } = jwt.verify(token, JWT);
    if(!id){
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    const response = await responseModel.find({ userId: id });
    if(!response){
      return res.status(404).json({
        success: false,
        message: 'Failed to fetch response'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Response',
      response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
    console.log(error);
  }
}

export {
  deleteAllNotification, deleteNotification,
  getAllNotification, getOwnNotification, getSingleNotification,
  pushNotification, pushNotificationToId, updateNotification
};

