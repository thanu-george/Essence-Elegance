import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  title: {type: String,required: true,},
  qty: {type: Number,required: true,min: 1,},
  price: {type: Number,required: true,},
  imageUrl: {type: String,required: true,
  },
});

const cartSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
  },
  items: [cartItemSchema], 
});
export const Cart = mongoose.model("Cart", cartSchema);