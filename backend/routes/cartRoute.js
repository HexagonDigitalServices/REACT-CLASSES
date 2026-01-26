import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearUserCart,
} from "../controllers/cartController.js";
import  authMiddleware  from "../middlewares/auth.js"; 

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.put("/update", authMiddleware, updateCartItem);
cartRouter.delete("/remove/:productId", authMiddleware, removeCartItem);
cartRouter.delete("/clear", authMiddleware, clearUserCart);

export default cartRouter;
