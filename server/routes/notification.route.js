import express from "express";
import {
    deleteAllNotification,
    deleteNotification,
    getAllNotification,
    getSingleNotification,
    pushNotification,
    updateNotification,
} from "../controller/notification.controllers.js";

const notificationRouter = express.Router();

notificationRouter.post("/postNotification", pushNotification);
notificationRouter.get("/getAllNotification", getAllNotification);
notificationRouter.get("/getByIdNotification/:id", getSingleNotification);
notificationRouter.delete("/deleteAllNotification", deleteAllNotification);
notificationRouter.delete("/deleteByIdNotification/:id", deleteNotification);
notificationRouter.put("/updateNotification/:id", updateNotification);

export default notificationRouter;
