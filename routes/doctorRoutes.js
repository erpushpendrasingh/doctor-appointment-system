const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
     getDoctorInfoController,
     updateProfileController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

// Post Single doctor information
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE PROFILE

router.post("/update", authMiddleware, updateProfileController);
module.exports = router;
