import mongoose from "mongoose";

const contSchema=new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    message: { type: String, required: true },
})

export const Contmsg= mongoose.model("Contmsg",contSchema)