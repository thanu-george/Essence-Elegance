import { Cart } from "../Models/Cart.js";

// Helper function to get guestId from request
const getGuestId = (req) => {
  return req.headers['guest-id'] || 'guest'; // Default to 'guest' for simplicity
};

export const addToCart = async (req, res) => {
  const { productId, title, qty, price, imageUrl } = req.body;

  // Use guestId instead of userId
  const guestId = getGuestId(req);

  let cart = await Cart.findOne({ guestId });
  if (!cart) {
    cart = new Cart({ guestId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // Update existing item's quantity
    cart.items[itemIndex].qty += qty;
    // Recalculate the total price based on updated quantity
  } else {
    // Add new item to cart
    cart.items.push({ productId, title, qty, price, imageUrl });
  }

  await cart.save();
  res.json({ message: "Item(s) added to cart", cart });
};


export const userCart = async (req, res) => {
  const guestId = getGuestId(req);
  let cart = await Cart.findOne({ guestId });
  if (!cart) return res.json({ message: "Cart not found" });
  res.json({ message: "Guest cart", cart });
};

export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  const guestId = getGuestId(req);
  let cart = await Cart.findOne({ guestId });
  if (!cart) return res.json({ message: "Cart not found" });
  
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  res.json({ message: "Product removed from cart" });
};


export const clearCart = async (req, res) => {
  try {
    const guestId = getGuestId(req);
    
    // Fetch the latest cart document
    let cart = await Cart.findOne({ guestId });
    
    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ guestId, items: [] });
    } else {
      // If the cart exists, clear the items
      cart.items = [];
    }
    
    // Save the cart
    await cart.save();
    
    // Respond with a success message
    res.json({ message: "Cart cleared" });
  } catch (error) {
    // Handle errors, including VersionError
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "An error occurred while clearing the cart." });
  }
};
export const adjustProductQty = async (req, res) => {
  const { productId, qtyChange } = req.body; // Extract productId and qtyChange from the request body
  const guestId = getGuestId(req); // Get the guest ID from the request

  // Validate qtyChange
  if (qtyChange === undefined || (qtyChange !== 1 && qtyChange !== -1)) {
      return res.status(400).json({ message: "Invalid quantity change" });
  }

  // Find the cart for the guest
  let cart = await Cart.findOne({ guestId });
  if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
  }

  // Find the index of the item in the cart
  const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
      const item = cart.items[itemIndex];

      // Adjust quantity based on qtyChange
      if (qtyChange === 1) {
          item.qty += 1; // Increase quantity
      } else if (qtyChange === -1) {
          if (item.qty > 1) {
              item.qty -= 1; // Decrease quantity
          } else {
              cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
          }
      }
  } else {
      return res.status(404).json({ message: "Product not found in cart" });
  }

  // Save the updated cart
  try {
      await cart.save();
      return res.json({ message: "Cart updated", cart });
  } catch (error) {
      console.error("Error saving cart:", error);
      return res.status(500).json({ message: "Error saving cart" });
  }
};