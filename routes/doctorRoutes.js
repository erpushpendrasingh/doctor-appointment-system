const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
     getDoctorInfoController,
     updateProfileController,
     getSingleDoctorInfoController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

// Post Single doctor information
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE PROFILE

router.post("/updateProfile", authMiddleware, updateProfileController);

// POST GET SINGLE DOCTOR INFORMATION

router.post("/getDoctorById", authMiddleware, getSingleDoctorInfoController);

module.exports = router;
