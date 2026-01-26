import mongoose from "mongoose";
import Watch from "../models/watchModel.js";
import path from "path";
import fs from "fs";

const API_BASE = "http://localhost:4000";

export async function createWatch(req, res) {
  try {
    const { name, description, price, category, brandName } = req.body;
    let image = req.body.image;

    if (req.file?.filename) image = `${API_BASE}/uploads/${req.file.filename}`;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ success: false, message: "name, description, price and image are required" });
    }

    const doc = new Watch({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      price,
      category,
      brandName,
      image,
    });

    const saved = await doc.save();
    return res.status(201).json({ success: true, message: "Watch created", data: saved });
  } catch (err) {
    console.error("createWatch error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getWatches(req, res) {
  try {
    const { category, sort = "-createdAt", page = 1, limit = 12 } = req.query;
    const filter = {};
    
    if (typeof category === "string") {
      const cat = category.trim().toLowerCase();
      if (cat === "men" || cat === "women") filter.category = cat;
    }

    const pg = Math.max(1, parseInt(page, 10) || 1);
    const lim = Math.min(200, parseInt(limit, 10) || 12);
    const skip = (pg - 1) * lim;

    const total = await Watch.countDocuments(filter);
    const items = await Watch.find(filter).sort(sort).skip(skip).limit(lim).lean();

    return res.json({ success: true, total, page: pg, limit: lim, items });
  } catch (err) {
    console.error("getWatches error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function deleteWatch(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id is required" });

    const w = await Watch.findById(id);
    if (!w) return res.status(404).json({ success: false, message: "Watch not found" });

    if (w.image && typeof w.image === "string") {
      const normalized = w.image.startsWith("/") ? w.image.slice(1) : w.image;
      if (normalized.startsWith("uploads/")) {
        const filename = normalized.replace(/^uploads\//, "");
        const filepath = path.join(process.cwd(), "uploads", filename);
        fs.unlink(filepath, (err) => {
          if (err) console.warn("Failed to unlink image file", filepath, err?.message || err);
        });
      }
    }

    await Watch.findByIdAndDelete(id);
    return res.json({ success: true, message: "Watch deleted" });
  } catch (err) {
    console.error("deleteWatch error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export async function getWatchesByBrand(req, res) {
  try {
    const brandName = req.params.brandName;
    const items = await Watch.find({ brandName }).sort({ createdAt: -1}).lean();
    return res.json({ success: true, items });
  } catch (err) {
    console.error("getWatchesByBrand error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
