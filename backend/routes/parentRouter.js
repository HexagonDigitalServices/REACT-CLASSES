// src/routes/jobRoutes.js
import express from "express";

import {  createJob, deleteJob, getJobById, getJobs } from "../controllers/parentController.js";
import authMiddleware from "../middlewares/auth.js";

const parentRouter = express.Router();

parentRouter.post("/", createJob);
parentRouter.get("/", getJobs);
parentRouter.get("/:id",getJobById);
parentRouter.delete("/:id", deleteJob);


export default parentRouter;
