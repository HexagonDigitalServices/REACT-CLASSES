// controllers/tutorRequestController.js
import mongoose from "mongoose";
import TutorRequest from "../models/parentApplied.js";

const generateUniqueId = () => {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TJ-${ts}-${rand}`;
};

const normalizePhone = (p) => String(p || "").replace(/\D/g, "").slice(0, 10);

/** Create a new tutor request (public) */
export const createRequest = async (req, res) => {
  try {
    const {
      parentName,
      phone,
      city = null,
      address = null,
      notes = null,
      email = null,
      requestedTutorUid,
      requestedTutorName,
      tutorPhone,
    } = req.body || {};

    if (!parentName || !phone) {
      return res.status(400).json({ success: false, message: "parentName and phone are required" });
    }

    const uniqueId = generateUniqueId();

    const doc = await TutorRequest.create({
      uniqueId,
      parentName,
      phone: normalizePhone(phone),
      city,
      address,
      notes,
      email,
      tutorName: requestedTutorName || null,
      tutorUid: requestedTutorUid || null,
      tutorPhone: tutorPhone || null,
    });

    return res.status(201).json({ success: true, request: doc });
  } catch (err) {
    console.error("createRequest error:", err);
    if (err?.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.message, errors: err.errors });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/** List requests with pagination & filters */
export const listRequests = async (req, res) => {
  try {
    const { page = 1, limit = 50, search = "", city, status } = req.query || {};
    const filter = {};

    if (city) filter.city = city;
    if (status) filter.status = String(status).toLowerCase();

    if (search) {
      const escaped = String(search).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      filter.$or = [
        { parentName: regex },
        { phone: regex },
        { address: regex },
        { tutorName: regex },
        { tutorUid: regex },
        { uniqueId: regex },
        { notes: regex },
        { email: regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.min(500, Math.max(1, parseInt(limit, 10) || 50));

    const [total, requests] = await Promise.all([
      TutorRequest.countDocuments(filter),
      TutorRequest.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * perPage).limit(perPage).lean(),
    ]);

    return res.json({ success: true, total, page: pageNum, limit: perPage, requests });
  } catch (err) {
    console.error("listRequests error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/** Get requests by tutorUid (returns docs and count) */
export const getRequest = async (req, res) => {
  try {
    const { tutorUid } = req.params;
    if (!tutorUid) return res.status(400).json({ success: false, message: "Missing uid parameter" });

    const [job, doc] = await Promise.all([
      TutorRequest.countDocuments({ tutorUid }),
      TutorRequest.find({ tutorUid }).lean(),
    ]);

    if (!doc || (Array.isArray(doc) && doc.length === 0)) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    return res.json({ success: true, request: doc, job });
  } catch (err) {
    console.error("getRequest error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/** Delete request */
export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    // use correct filter form for findOneAndDelete
    const deleted = await TutorRequest.findOneAndDelete({ uniqueId: id }).lean();
    if (!deleted) return res.status(404).json({ success: false, message: "Request not found" });

    return res.json({ success: true, message: "Deleted", request: deleted });
  } catch (err) {
    console.error("deleteRequest error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default { createRequest, listRequests, getRequest, deleteRequest };
