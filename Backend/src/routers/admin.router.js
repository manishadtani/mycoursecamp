const express = require("express")
const adminController = require("../controllers/adminController")
const { verifyAdmin } = require("../middlewares/adminMiddleware")
const router = express.Router()

router.post("/login", adminController.adminloginController)

router.get("/profile", verifyAdmin ,adminController.adminprofileController)




module.exports = router