import express from "express";
import { getDashboardOverview } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/auth.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", authMiddleware, getDashboardOverview);

export default dashboardRouter;
