import { Product } from "../Models/Product.js";

export const addprod = async (req, res) => {
    const { pid,name,price,category,qty } = req.body;
    try {
        const product = await Product.create({
            pid,name,price,category,qty 
        });
        res.status(201).json({ message: "Product added successfully", product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing product
export const updateprod = async (req, res) => {
    const { pid } = req.params;
    const updateData = req.body;
    try {
        const product = await Product.findOneAndUpdate({ pid }, updateData, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product has been updated", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getprod = async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await Product.findOne({pid:pid});  // Correct usage of findById
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product", error });
    }
};
  

