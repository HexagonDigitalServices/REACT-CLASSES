import mongoose from "mongoose";
import Application from "../models/tutorApplied.js";
import Job from "../models/jobModel.js";

const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const findJobByIdOrJobId = async (id) => {
  if (!id) return null;
  if (isObjectId(id)) {
    const j = await Job.findById(id).lean();
    if (j) return j;
  }
  return Job.findOne({ jobId: id }).lean();
};

const tutorUidFrom = (tutorDoc) => (tutorDoc?.uid || (tutorDoc?._id ? String(tutorDoc._id) : ""));

export const applyToJob = async (req, res) => {
  try {
    if (!req.tutor) return res.status(401).json({ success: false, message: "Authentication required (tutor)" });

    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "job id required in params" });

    const job = await findJobByIdOrJobId(id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.status && String(job.status).toLowerCase() === "closed")
      return res.status(400).json({ success: false, message: "Job is closed" });

    const tutorDoc = req.tutor;
    const tutorId = tutorDoc._id ? String(tutorDoc._id) : null;
    const tutorUid = tutorUidFrom(tutorDoc);
    const tutorName = tutorDoc.name || tutorDoc.fullname || tutorDoc.username || "Tutor";
    const tutorEmail = tutorDoc.email;
    const tutorPhone = tutorDoc.phone;

    const existing = await Application.findOne({ jobId: job.jobId, tutorUid });
    if (existing) return res.status(409).json({ success: false, message: "You have already applied for this job" });

    const snapshot = {
      jobId: job.jobId,
      parentName: job.parentName || job.name || null,
      parentMobile: job.parentMobile || job.phone || null,
      address: job.address || job.area || null,
      city: job.city || null,
      notes: job.notes || null,
      classSubjects: job.classSubjects || null,
    };

    const appDoc = new Application({
      tutorId: tutorId || null,
      tutorUid,
      tutorName,
      tutorEmail,
      tutorPhone,
      parentName: snapshot.parentName,
      parentMobile: snapshot.parentMobile,
      jobId: job.jobId,
      jobSnapshot: snapshot,
      message: req.body.message ? String(req.body.message).trim() : null,
      status: "New",
    });

    await appDoc.save();
    return res.status(201).json({ success: true, message: "Application submitted", application: appDoc });
  } catch (err) {
    console.error("applyToJob:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const listApplications = async (req, res) => {
  try {
    const { mine, jobId, page = 1, limit = 20 } = req.query;
    const pg = Math.max(1, Number(page) || 1);
    const lim = Math.min(200, Number(limit) || 20);
    const skip = (pg - 1) * lim;

    const query = {};
    if (String(mine) === "true") {
      if (!req.tutor) return res.status(401).json({ success: false, message: "Authentication required to view your applications" });
      query.tutorUid = tutorUidFrom(req.tutor);
    }
    if (jobId) query.jobId = String(jobId);

    const [total, docs] = await Promise.all([
      Application.countDocuments(query),
      Application.find(query).sort({ appliedAt: -1 }).skip(skip).limit(lim).lean(),
    ]);

    return res.json({ success: true, applications: docs, total, page: pg, limit: lim });
  } catch (err) {
    console.error("listApplications:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getAppliedJobIds = async (req, res) => {
  try {
    if (!req.tutor) return res.status(401).json({ success: false, message: "Authentication required" });

    const tutorUid = tutorUidFrom(req.tutor);
    const apps = await Application.find({ tutorUid }).select("jobId").lean();
    const appliedJobIds = apps.map((a) => a.jobId);

    return res.json({ success: true, appliedJobIds });
  } catch (err) {
    console.error("getAppliedJobIds:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    let app = null;
    if (isObjectId(id)) app = await Application.findById(id).lean();
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const requester = req.tutor || null;
    const isOwner = requester && (String(requester.uid) === String(app.tutorUid) || String(requester._id) === String(app.tutorId));
    if (isOwner) return res.json({ success: true, application: app });

    // non-owner: return public view (keeps behavior from original — redact if you want)
    return res.json({ success: true, application: app });
  } catch (err) {
    console.error("getApplicationById:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    app.status = status;
    await app.save();
    return res.json({ success: true, message: "Application status updated", application: app });
  } catch (err) {
    console.error("updateApplicationStatus:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const deleted = await Application.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Application not found" });

    return res.json({ success: true, message: "Application deleted" });
  } catch (err) {
    console.error("deleteApplication:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export default {
  applyToJob,
  listApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
