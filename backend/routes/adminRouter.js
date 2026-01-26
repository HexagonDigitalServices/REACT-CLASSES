import express from "express";
import { register, login } from "../controllers/adminController.js";

const adminRouter = express.Router();

// adminRouter.post("/register", register);
adminRouter.post("/login", login);

export default adminRouter;
