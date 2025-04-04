const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ["user", "instructor", "admin", "pending"], default: "user" },
    isApproved: { type: Boolean, default: false },
    expertise: { type: String, default: null }, 
}, {timestamps: true });



module.exports = mongoose.model("user", userSchema);
