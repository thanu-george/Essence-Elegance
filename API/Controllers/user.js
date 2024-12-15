import { User } from "../Models/User.js"
import bcrypt from "bcryptjs";

export const register = async (req,res)=>{
    const{name,email,password}=req.body
    try{
        let user= await User.findOne({email})
        if (user) 
            return res.json({message: "user exists already",success:false })
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        user= await User.create({name,email,password:hashPass})
        res.json({message:"User registered succesfully",user,success:true})
    }catch (error){
        res.json({message:error.message})
    }
};

export const login=async (req,res) =>{
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Invalid email or password", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid email or password", success: false });
        }
        res.json({ message: "Login successful", success: true,user });
    } catch (error) { 
        res.json({message: error .message});
    }
};

