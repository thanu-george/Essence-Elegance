import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    pid: { type: String, required: true },
    name: { type: String, required: true},
    price: { type:Number, required: true},
    category: { type:String, required: true},
    qty: { type:Number, required: true},
  });
  
export const Product = mongoose.model('Product', productSchema);
