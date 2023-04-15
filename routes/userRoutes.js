const express = require("express");
const {
     loginController,
     registerController,
     authController,
     applyDoctorController,
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

router.post("/getUserData",authMiddleware,authController)


//Apply Doctor||post

router.post("/apply-doctor",authMiddleware,applyDoctorController)



module.exports = router;
