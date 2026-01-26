// src/routes/applicationRoutes.js
import express from "express";
import { applyToJob, deleteApplication, getApplicationById, getAppliedJobIds, listApplications, updateApplicationStatus } from "../controllers/tutorApplicationController.js";
import authMiddleware from "../middlewares/auth.js";


const applicationRouter = express.Router();


applicationRouter.post("/applications/:id/apply",authMiddleware, applyToJob);
applicationRouter.get("/applications",  listApplications);
applicationRouter.get("/applications/applied-jobs",authMiddleware, getAppliedJobIds)
applicationRouter.get("/applications/:id",  getApplicationById);
applicationRouter.delete("/applications/:id", deleteApplication)
applicationRouter.patch("/applications/:id/status",  updateApplicationStatus);

export default applicationRouter;
