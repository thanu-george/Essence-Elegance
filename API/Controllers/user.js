import { User } from "../Models/User.js";

export const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) 
            return res.json({ message: "User exists already", success: false });
        user = await User.create({ name, email, password, phone });
        await user.save();
        res.json({ message: "User registered successfully", user, success: true });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name });
        if (!user) {
            return res.json({ message: "Invalid username", success: false });
        }
        if (user.password !== password) {
            return res.json({ message: "Invalid password", success: false });
        }
        res.json({ message: "Login successful", success: true}); // Return the token
    } catch (error) { 
        res.json({ message: error.message });
    }
};
