const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.verifyAdmin = (req, res, next) => {

    const auth = req.headers['authorization']
    const token = auth.split(" ")[1]
    // console.log(token)

    if (!token) return res.status(403).json({ message: "Access denied" });
    try {

        const decoded = jwt.verify(token, config.SECRET_KEY);
        if (decoded.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};