const express = require("express");
const {
     loginController,
     registerController,
     authController,
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



module.exports = router;
