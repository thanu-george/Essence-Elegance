import { Products } from "../Models/Product.js"

export const addprod = async (req,res)=>{
    const{pid,title,price,qty}=req.body
    try{
        let product= await Products.create({
            pid,title,price,qty
        });
        res.json({message:"product added succesfully",product,success:true})
    }catch (error){
        res.json({message:error.message})
    }
};
export const findprod=async(req,res)=>{
    const {id}=req.params
    let product=await Products.findOneAndUpdate ({pid:id})
    if(!product) return res.json({message:"not found"})
    res.json({message:"product:", product})
};
export const updateprod=async(req,res)=>{
    const { id } = req.params;
    const updateData = req.body;
    const product = await Products.findOneAndUpdate({ pid: id },updateData,{ new: true })
    if(!product) return res.json({message:"not found"})
    res.json({message:"product has been updated"})
};