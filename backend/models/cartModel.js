// models/cartModel.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {   
    productId: { type: String, required: true },  
    name: { type: String, required: true },
    img: { type: String, required: true }, // URL or dataURL
    price: { type: Number, required: true, min: 0 },   
    qty: { type: Number, required: true, default: 1, min: 1 },
    description : {type: String, }, 
  },
  { _id: false } 
);

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true } 
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
