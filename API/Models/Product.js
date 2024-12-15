import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
    pid:{type:String, required:true},
    title:{type:String, required:true},
    price:{type:String,required:true},
    qty:{type:String, required:true}
})

export const Products=mongoose.model("Products",prodSchema)