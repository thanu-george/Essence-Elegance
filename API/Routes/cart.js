import express from "express";
import { addToCart, clearCart, adjustProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";

const router = express.Router();

// Route to add items to the cart
router.post("/add", addToCart);

// Route to get the cart for a guest 
router.get("/cart", userCart); // Adjusted endpoint for clarity

// Route to remove an item from the cart
router.delete("/remove/:productId", removeProductFromCart);

// Route to clear the cart
router.delete('/clear', clearCart);

// Route to decrease the quantity of an item in the cart
router.post("/adjust", adjustProductQty); // Adjusted endpoint for clarity

export default router;