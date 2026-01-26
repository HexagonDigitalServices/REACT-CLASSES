// src/controllers/jobController.js
import mongoose from "mongoose";
import Job from "../models/jobModel.js";

const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const phoneValid = (v) => /^\d{10}$/.test(String(v));
const sanitizeJob = (j) => (j && j.toObject ? j.toObject() : j);

const findJobByIdOrJobId = async (id) => {
  if (!id) return null;
  if (isObjectId(id)) {
    const byId = await Job.findById(id).lean();
    if (byId) return byId;
  }
  return Job.findOne({ jobId: id }).lean();
};

export const createJob = async (req, res) => {
  try {
    const b = req.body || {};
    const parentName = String(b.parentName || "").trim();
    const parentMobile = String(b.parentMobile || b.phone || "").trim();
    const parentEmail = b.parentEmail || null;
    const classSubjects = b.classSubjects || [];
    const address = String(b.address || b.area || "").trim();
    const city = String(b.city || "").trim();
    const notes = b.notes || b.jobDescription || "";

    if (!parentName || !parentMobile || !classSubjects || !address || !city) {
      return res.status(400).json({
        success: false,
        message: "parentName, parentMobile, classSubjects, address and city are required",
      });
    }
    if (!phoneValid(parentMobile)) {
      return res.status(400).json({ success: false, message: "parentMobile must be 10 digits" });
    }

    const jobId = b.jobId || `J-${Date.now().toString().slice(-6)}`;
    const job = new Job({
      jobId,
      parentName,
      parentMobile,
      parentEmail,
      classSubjects,
      address,
      city,
      notes,
      createdAtFrontend: b.createdAtFrontend ? new Date(b.createdAtFrontend) : undefined,
    });

    await job.save();
    return res.status(201).json({ success: true, message: "Job created", job: sanitizeJob(job) });
  } catch (err) {
    console.error("createJob:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { q, city, address, jobId, subject, page = 1, limit = 12 } = req.query;
    const mongoQuery = {};
    if (city) mongoQuery.city = city;
    if (address) mongoQuery.address = address;
    if (jobId) mongoQuery.jobId = jobId;
    if (q) {
      const re = new RegExp(String(q).trim(), "i");
      mongoQuery.$or = [{ parentName: re }, { notes: re }, { address: re }, { city: re }];
    }

    const pg = Math.max(1, Number(page));
    const lim = Math.min(100, Number(limit) || 12);
    const skip = (pg - 1) * lim;

    let docs = await Job.find(mongoQuery).sort({ createdAt: -1 }).skip(skip).limit(lim).lean();

    if (subject) {
      const s = String(subject).toLowerCase();
      docs = docs.filter((j) => {
        const cs = j.classSubjects || [];
        if (Array.isArray(cs)) {
          return cs.some((entry) => {
            const subj = String(entry?.subject ?? entry).toLowerCase();
            return subj.includes(s);
          });
        }
        try {
          const vals = Object.values(cs).flat();
          return vals.some((v) => String(v).toLowerCase().includes(s));
        } catch {
          return false;
        }
      });
    }

    const total = await Job.countDocuments(mongoQuery);

    const countsAgg = await Job.aggregate([
      { $match: mongoQuery },
      {
        $group: {
          _id: { $ifNull: ["$parentMobile", "$parentEmail"] },
          count: { $sum: 1 },
        },
      },
    ]);

    const countsByParent = {};
    countsAgg.forEach((r) => { if (r._id) countsByParent[String(r._id)] = r.count; });

    return res.json({ success: true, jobs: docs, total, page: pg, limit: lim, countsByParent });
  } catch (err) {
    console.error("getJobs:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const job = await findJobByIdOrJobId(id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    return res.json({ success: true, job });
  } catch (err) {
    console.error("getJobById:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    let job = null;
    if (isObjectId(id)) job = await Job.findById(id);
    if (!job) job = await Job.findOne({ jobId: id });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    await Job.deleteOne({ _id: job._id });
    return res.json({ success: true, message: "Job permanently deleted" });
  } catch (err) {
    console.error("deleteJob:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export default { createJob, getJobs, getJobById, deleteJob };
