import express from "express";
import {
    deleteAllNotification,
    deleteNotification,
    getAllNotification,
    getOwnNotification,
    getSingleNotification,
    pushNotification,
    pushNotificationToId,
    updateNotification,
} from "../controller/notification.controllers.js";

const notificationRouter = express.Router();

notificationRouter.post("/postNotification", pushNotification);
notificationRouter.post("/postNotificationToId/:id", pushNotificationToId);
notificationRouter.get("/getAllNotification", getAllNotification);
notificationRouter.get("/getOwnNotification", getOwnNotification);
notificationRouter.get("/getByIdNotification/:id", getSingleNotification);
notificationRouter.delete("/deleteAllNotification", deleteAllNotification);
notificationRouter.delete("/deleteByIdNotification/:id", deleteNotification);
notificationRouter.put("/updateNotification/:id", updateNotification);

export default notificationRouter;

