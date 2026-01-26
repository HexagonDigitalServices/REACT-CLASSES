import express from "express";
import {
  createOrder,
  confirmPayment,
  getOrders,
  getUserOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middlewares/auth.js"; 

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/confirm", confirmPayment);
orderRouter.get("/my", authMiddleware, getUserOrders);
orderRouter.get("/", getOrders);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
