const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/Appointmodel");
const moment = require("moment");
//Register callback
const registerController = async (req, res) => {
     try {
          const exisitingUsers = await userModel.findOne({
               email: req.body.email,
          });
          if (exisitingUsers) {
               return res
                    .status(200)
                    .send({ message: "User Already Exist", success: false });
          }
          const password = req.body.password;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          req.body.password = hashedPassword;
          const newUser = new userModel(req.body);
          await newUser.save();
          res.status(201).send({
               message: "Register Successfully",
               success: true,
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               message: `Register Controller ${error.message}`,
          });
     }
};

//Login callback

const loginController = async (req, res) => {
     try {
          const user = await userModel.findOne({ email: req.body.email });
          if (!user) {
               return res
                    .status(200)
                    .send({ message: "user not found", success: false });
          }
          const isMatch = await bcrypt.compare(
               req.body.password,
               user.password
          );
          if (!isMatch) {
               return res.status(200).send({
                    message: "Invalid Email or Password",
                    success: flase,
               });
          }
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
               expiresIn: "1d",
          });
          res.status(200).send({
               message: "Login Success",
               success: true,
               token,
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               message: `Error in Login CTRL ${error.message}`,
          });
     }
};
const authController = async (req, res) => {
     try {
          const user = await userModel.findById({ _id: req.body.userId });
          user.password = undefined;
          if (!user) {
               return res
                    .status(200)
                    .send({ message: "user not found", success: false });
          } else {
               res.status(200).send({
                    success: true,
                    data: user,
               });
          }
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               message: "auth error",
               success: false,
               error,
          });
     }
};

// ApplyDoctorController

const applyDoctorController = async (req, res) => {
     try {
          const newDoctor = await doctorModel({
               ...req.body,
               status: "pending",
          });
          await newDoctor.save();
          const adminUser = await userModel.findOne({ isAdmin: true });
          const notifacation = adminUser.notifacation;
          notifacation.push({
               type: "apply-doctor-request",
               message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
               data: {
                    doctorID: newDoctor._id,
                    name: newDoctor.firstName + " " + newDoctor.lastName,
                    onClickPath: "/admin/doctors",
               },
          });
          await userModel.findByIdAndUpdate(adminUser._id, { notifacation });
          res.status(201).send({
               success: true,
               message: "Doctor Account Applied Successfully",
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               error,
               message: "Error While Applying For Doctor",
          });
     }
};
const getAllNotificationController = async (req, res) => {
     try {
          const user = await userModel.findOne({ _id: req.body.userId });
          const seennotification = user.seennotification;
          const notifacation = user.notifacation;
          seennotification.push(...notifacation);
          user.notifacation = [];
          user.seennotification = notifacation;
          const updatedUser = await user.save();
          res.status(200).send({
               success: true,
               message: "All notification are marked as read",
               data: {
                    data: updatedUser,
               },
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               message: "Error in notification",
               success: false,
               error,
          });
     }
};
// delet notifacation
const deleteAllNotificationController = async (req, res) => {
     try {
          const user = await userModel.findOne({ _id: req.body.userId });
          user.notifacation = [];
          user.seennotification = [];
          const updatedUser = await user.save();
          updatedUser.password = undefined;
          res.status(200).send({
               success: true,
               message: "Notifications Deleted successfully",
               data: updatedUser,
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               message: "Unable to delete Notification",
          });
     }
};

const getAllDoctorController = async (req, res) => {
     try {
          const doctors = await doctorModel.find({ status: "approved" });
          // console.log("doctors:", doctors);
          res.status(200).send({
               success: true,
               message: "Doctor Lists Fetched Successfully",
               data: doctors,
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               message: "Errro WHile Fetching Docotr",
               error,
          });
     }
};
const bookAppointmentController = async (req, res) => {
     try {
          req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
          req.body.time = moment(req.body.time, "HH:mm").toISOString();

          req.body.status = "pending";
          const newAppointment = new appointmentModel(req.body);
          await newAppointment.save();
          const user = await userModel.findOne({
               _id: req.body.doctorInfo.userId,
          });
          user.notifacation.push({
               type: "New-appointment-request",
               message: `A new Appointment request from ${req.body.userInfo.name}`,
               onClickPath: "/user/appointments",
          });
          await user.save();
          res.status(200).send({
               success: true,
               message: "Appointment book Successfully",
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: "Errro while booking appointment",
          });
     }
     // try {
     //      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
     //      req.body.time = moment(req.body.time, "HH:mm").toISOString();
     //      req.body.status = "pending";
     //      const newAppointment = new appointmentModel(req.body);
     //      await newAppointment.save();
     //      const user = await userModel.findOne({
     //           _id: req.body.doctorInfo.userId,
     //      });
     //      user.notifacation.push({
     //           type: "New-appointment-request",
     //           message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
     //           onCLickPath: "/user/appointments",
     //      });
     //      await user.save();
     //      res.status(200).send({
     //           success: true,
     //           message: "Appointment Book succesfully",
     //      });
     // } catch (error) {
     //      console.log(error);
     //      res.status(500).send({
     //           success: false,
     //           error,
     //           message: "Error While Booking Appointment",
     //      });
     // }
};
// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
     try {
          const date = moment(req.body.date, "DD-MM-YY").toISOString();
          const fromTime = moment(req.body.time, "HH:mm")
               .subtract(1, "hours")
               .toISOString();
          const toTime = moment(req.body.time, "HH:mm")
               .add(1, "hours")
               .toISOString();
          const doctorId = req.body.doctorId;
          const appointments = await appointmentModel.find({
               doctorId,
               date,
               time: {
                    $gte: fromTime,
                    $lte: toTime,
               },
          });
          if (appointments.length > 0) {
               return res.status(200).send({
                    message: "Appointments not Availibale at this time",
                    success: true,
               });
          } else {
               return res.status(200).send({
                    success: true,
                    message: "Appointments available",
               });
          }
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: "Error In Booking",
          });
     }
};
const userAppointmentsController = async (req, res) => {
     try {
          const appointments = await appointmentModel.find({
               userId: req.body.userId,
          });
          res.status(200).send({
               success: true,
               message: "Users Appointments Get SUccessfully",
               data: appointments,
          });
     } catch (error) {
          console.log(error);
          res.status(500).send({
               success: false,
               error,
               message: "Error In User Appointments",
          });
     }
};
module.exports = {
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
};
