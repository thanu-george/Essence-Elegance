import { User } from "../Models/User.js"

export const register = async (req,res)=>{
    const{name,email,password,phone}=req.body
    try{
        let user= await User.findOne({email})
        if (user) 
            return res.json({message: "user exists already",success:false })
        user= await User.create({name,email,password,phone})
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
        if (user.password !== password) {
            return res.json({ message: "Invalid email or password", success: false });
        }
        res.json({ message: "Login successful", success: true,user });
    } catch (error) { 
        res.json({message: error .message});
    }
};

