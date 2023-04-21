const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
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

// const getAllDoctorController = async (req, res) => {
//      try {
//           const doctors = await doctorModel.find({ status: "approved" });
//           res.status(200).send({
//                success: true,
//                message: "Docots Lists Fetched Successfully",
//                data: doctors,
//           });
//      } catch (error) {
//           console.log(error);
//           res.status(500).send({
//                success: false,
//                error,
//                message: "Errro WHile Fetching DOcotr",
//           });
//      }
// };
const getAllDoctorController = async (req, res) => {
     console.log("req:", req);
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

module.exports = {
     loginController,
     registerController,
     authController,
     applyDoctorController,
     getAllNotificationController,
     deleteAllNotificationController,
     getAllDoctorController,
};
