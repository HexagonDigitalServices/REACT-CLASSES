// src/models/applicationModel.js
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", default: null },
  tutorUid: { type: String, required: true }, 
  tutorName: { type: String, required: true },
  tutorEmail : {type: String, required: true},
  tutorPhone : {type : String, required: true},
  parentName: { type: String, default: null },
  parentMobile: { type: String, default: null },
  jobId: { type: String, required: true }, 
  jobSnapshot: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ["New", "Completed", "Contacted"],default: "New" },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
