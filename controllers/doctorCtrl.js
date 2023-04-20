const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
     try {
          const doctor = await doctorModel.findOne({ userId: req.body.userId });
          res.status(200).send({
               success: true,
               message: "Doctor Data Fetch Successfully",
               data: doctor,
          });
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               error,
               message: "Error In Fetching Doctor Details",
          });
     }
};
const updateProfileController = async (req, res) => {
     try {
     } catch (error) {
          console.log("error:", error);
          res.status(500).send({
               success: false,
               error,
               message: "Error In Fetching Doctor Details",
          });
     }
};
module.exports = { getDoctorInfoController, updateProfileController };
