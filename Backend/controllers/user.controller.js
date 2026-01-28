import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyEmail } from "../email/emailVerify.js";
import { Session } from "../models/sessionModel.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email | !password) {
            return res.status(400).json({
                succes: false,
                message: "All Fileds Are Required!"
            })
        }

        const isExists = await User.findOne({ email });

        if (isExists) {
            return res.status(400).json({
                success: false,
                message: "user already exists!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ firstname, lastname, email, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "10m"
        });
        verifyEmail(token, email); // Send Email Here
        newUser.token = token;

        await newUser.save();

        

        const userResponse = newUser.toObject();
        userResponse.password = "";

        return res.status(201).json({
            success: true,
            message: "user registered successfully!",
            user: userResponse
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || "internal server error!",
            success: false
        })
    }
}       

export const verify = async(req,res)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                success:false,
                message:"Authorization token is missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try{
            decoded = jwt.verify(token,process.env.SECRET_KEY);
        }catch(error){
            if(error.name === "TokenExpiredError"){
                return res.status(400).json({
                    succes:false,
                    message:"The registration token has expired"
                })
            }
            return res.status(400).json({
                success:false,
                message:"Token verification failed.."
            })
        }

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        user.token = null;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Email verified successfully"
        })
    } catch (error) {
        res.status(500).json({
            succes:false,
            message:error.message
        })
    }
}

export const reVerify = async(req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
           const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "10m"
        });
        verifyEmail(token, email); // Send Email Here
        user.token = token;
        await user.save();
        
        return res.status(200).json({
            message:"Reverification Email sent successfully",
            token:user.token,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            messages:error.message,
            success:false
        })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:"all fileds aere required",
                success:false
            })
        }
        
        const existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        
        const isValidPassword = await bcrypt.compare(password,existingUser.password);

        if(!isValidPassword){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }

        if(existingUser.isVerified === false){
            return res.status(400).json({
                message:"verify your account then login",
                success:false
            })
        }
        
        const accessToken = jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{expiresIn:"10d"});
        const refreshToken = jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{expiresIn:"30d"});

        existingUser.isLoggedIn = true;
        await existingUser.save();
        // Checked For Exisiting Session and deleted it
        const existingSession = await Session.findOne({userId:existingUser._id});
        if(existingSession){
          await Session.deleteOne({userId:existingUser._id});
        }

        const userResponse = existingUser.toObject()
        userResponse.password = ""
        await Session.create({userId:existingUser._id});
        return res.status(200).json({
            message:`welcome back ${existingUser.firstname}`,
            success:true,
            user:userResponse,
            accessToken,
            refreshToken 
        })

    } catch (error) {
         return res.status(500).json({
            messages:error.message,
            success:false
        })
    }
}