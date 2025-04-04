
const config = require("../config/config")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

module.exports.authUser = async (req,res,next)=>{
    const auth = req.headers['authorization']
    const token = auth.split(" ")[1]

    if(!token) return res.send(401).json({message:"unauthorization"})

    try {
                const decoded = jwt.verify(token, config.SECRET_KEY)

                const user = await userModel.findOne({id:decoded._id})

                req.user = user

                return next()

        } catch (error) {
                return res.status(401).json({message:"unauthorized"})
        }
}