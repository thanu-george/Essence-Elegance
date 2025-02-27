import { Contmsg } from "../Models/Contact.js";

export const add = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }
        
        const payload = { name, email, message };
        
        const savedData = await Contmsg.create(payload);
        
        return res.status(201).json({ 
            message: "Data added successfully", 
            data: savedData, 
            success: true 
        });
        
    } catch (error) {
        return res.status(500).json({ 
            message: error.message || "Internal Server Error", 
            success: false 
        });
    }
};