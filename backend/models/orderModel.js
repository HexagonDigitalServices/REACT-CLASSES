// models/orderModel.js
import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const itemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    img: { type: String, default: null },
    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, default: 1, min: 1 },
    description: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: [itemSchema], default: [] },
    shippingCharge: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["Online", "Cash on Delivery"], required: true },
    paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
    sessionId: { type: String },
    paymentIntentId: { type: String },
    notes: { type: String },
    orderStatus: { type: String, enum: ["Pending", "Completed", "Confirmed", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
