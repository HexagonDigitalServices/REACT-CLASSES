// routes/tutorRequestRoutes.js
import express from "express";
import {
  createRequest,
  listRequests,
  getRequest,
  deleteRequest,
} from "../controllers/parentApplicationController.js";


const requestRouter = express.Router();

requestRouter.post("/", createRequest);
requestRouter.get("/", listRequests);
requestRouter.get("/:tutorUid", getRequest);
requestRouter.delete("/:id", deleteRequest);

export default requestRouter;
