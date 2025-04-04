const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const userMidleware = require("../middlewares/userMiddleware")

router.post("/register", userController.createController)

router.post("/login", userController.loginController)

router.get("/profile", userMidleware.authUser ,userController.profileController)

//instructor
router.post("/instructor-register", userController.instructorRegisterController);

module.exports = router