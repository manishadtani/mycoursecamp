const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.adminloginController = async (req,res)=>{
    try {
        const { email, password } = req.body;

        const admin = await userModel.findOne({ email, role: "admin" });
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: admin.role }, config.SECRET_KEY, { expiresIn: "7d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


module.exports.adminprofileController = async (req,res) => {
        try {
            const user = await userModel.findById(req.user.id)
            res.json(user)
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
}