const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const config = require("../config/config")

module.exports.createController = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username) {
            return res.status(400).json({ message: "username is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).json({ message: "password is required" });
        }

        const isUser = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (isUser) {
            return res.status(400).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'   // ✅ Add this line
        });

        const token = jwt.sign({ userId: user._id, email: user.email }, config.SECRET_KEY);
        res.json({ token: token, user: user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};



module.exports.loginController = async (req,res)=>{


    try {
        const {email, password} = req.body

        if(!email){
            return res.status(400).json({message:"email is required"})
        }
        if(!password){
            return res.status(400).json({message:"password is required"})
        }

        const isUser = await userModel.findOne({email})

        if(!isUser){
            return res.status(400).json({message:"invalid credentials"})
        }

        const result = await bcrypt.compare(password, isUser.password)

        if(!result){
            return res.status(400).json({message:"invalid credentials"})
        }

        const token = jwt.sign({userId:isUser._id, email:isUser.email, role:isUser.role}, config.SECRET_KEY)

        res.json({token:token, message:"user is successfully login", role:isUser.role})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"server error"})
    }
       
}



module.exports.profileController = async (req,res)=>{
    console.log(req.user)
    try {
        
        const user = await userModel.findById(req.user.id)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(401).json({message:"Internal server error"})
    }
    
}





// module.exports.instructorRegisterController = async (req,res)=>{
//     try {
//         const { username, email, password, expertise, qualification } = req.body;
    
//         // Check if user already exists
//         let instructor = await userModel.findOne({ email });
//         if (instructor) {
//           return res.status(400).json({ message: "Instructor already exists" });
//         }
    
//         // Hash Password
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         // Save Instructor Request in DB with Pending Approval
//         instructor = new instructor({
//           username,
//           email,
//           password: hashedPassword,
//           role: "instructor",
//           expertise,
//           pendingApproval: true,  // ✅ Marked for Admin Approval
//         });
    
//         await user.save();
    
//         res.status(201).json({ message: "Instructor registration pending for approval" });
    
//       } catch (err) {
//         res.status(500).json({ message: "Server Error" });
//       }
    
    
// }



// module.exports.InstructorLoginController = async (req,res)=>{


//     try {
//         const {email, password} = req.body

//         if(!email){
//             return res.status(400).json({message:"email is required"})
//         }
//         if(!password){
//             return res.status(400).json({message:"password is required"})
//         }

//         const isUser = await userModel.findOne({email})

//         if(!isUser){
//             return res.status(400).json({message:"invalid credentials"})
//         }

//         const result = await bcrypt.compare(password, isUser.password)

//         if(!result){
//             return res.status(400).json({message:"invalid credentials"})
//         }

//         const token = jwt.sign({userId:isUser._id, email:isUser.email, role:isUser.role}, config.SECRET_KEY)

//         res.json({token:token, message:"user is successfully login", role:isUser.role})

//     } catch (error) {
//         console.log(error)
//         res.status(400).json({message:"server error"})
//     }
       
// }