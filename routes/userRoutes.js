const express = require("express");
const {
     loginController,
     registerController,
     authController,
     applyDoctorController,
     getAllNotificationController,
     deleteAllNotificationController,
     getAllDoctorController,
     bookAppointmentController,
     bookingAvailabilityController,
     userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// router object
const router = express.Router();

//routes
//login||Post
router.post("/login", loginController);

//register||post
router.post("/register", registerController);

//Auth||post

router.post("/getUserData", authMiddleware, authController);

//Apply Doctor||post

router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction Doctor || post

router.post(
     "/get-all-notification",
     authMiddleware,
     getAllNotificationController
);

//
router.post(
     "/delete-all-notification",
     authMiddleware,
     deleteAllNotificationController
);

// get All Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorController);

// get All Doctors
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//Booking Avliability
router.post(
     "/booking-availbility",
     authMiddleware,
     bookingAvailabilityController
);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
