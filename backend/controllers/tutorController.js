// src/controllers/tutorController.js
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Tutor from "../models/tutorModel.js";

const STRIPE_SECRET_KEY = "";
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
const JWT_SECRET = "your_jwt_secret_here";
const FRONTEND_URL = "http://localhost:5173";
const REGISTRATION_FEE = Number(process.env.REGISTRATION_FEE || 1500);

const signToken = (tutor) => jwt.sign({ id: tutor._id, uid: tutor.uid }, JWT_SECRET, { expiresIn: "7d" });

function sanitizeTutor(tutorDoc) {
  if (!tutorDoc) return null;
  const t = tutorDoc.toObject ? tutorDoc.toObject() : { ...tutorDoc };
  delete t.password;
  delete t.sessionId;
  return t;
}

async function generateUnique4DigitUid() {
  for (let i = 0; i < 10; i++) {
    const uid = String(Math.floor(1000 + Math.random() * 9000));
    if (!(await Tutor.findOne({ uid }))) return uid.padStart(4, "0");
  }
  return ("" + Math.floor(Math.random() * 9000 + 1000)).slice(0, 4);
}

/* ------------------ Registration (checkout session) ------------------ */
export const createRegistrationSession = async (req, res) => {
  try {
    const bodyRaw = req.body || {};
    let classSubjects = bodyRaw.classSubjects ?? {};
    if (typeof classSubjects === "string" && classSubjects.trim()) {
      try { classSubjects = JSON.parse(classSubjects); } catch {}
    }

    const required = [
      "name","email","phone","password","city","area","address","homeAddress",
      "profilePictureName","classSubjects","videoLink","gender","experienceYears",
      "experienceMonths","collegeName","graduationYear","major","selfDescription"
    ];
    for (const f of required) {
      if (!bodyRaw[f] && !(f === "profilePictureName" && req.file)) {
        return res.status(400).json({ success: false, message: `${f} is required` });
      }
    }

    if (!/^\d{10}$/.test(String(bodyRaw.phone))) {
      return res.status(400).json({ success: false, message: "phone must be 10 digits" });
    }
    if (!classSubjects || typeof classSubjects !== "object" || Object.keys(classSubjects).length === 0) {
      return res.status(400).json({ success: false, message: "classSubjects required (object mapping class -> subjects[])" });
    }

    const existing = await Tutor.findOne({
      $or: [{ email: String(bodyRaw.email).toLowerCase() }, { phone: String(bodyRaw.phone) }]
    });
    if (existing) return res.status(409).json({ success: false, message: "A tutor with same email/phone already exists" });

    const hashedPassword = await bcrypt.hash(String(bodyRaw.password), 10);
    const profilePicturePath = req.file && req.file.filename ? `/uploads/${req.file.filename}` : null;
    const uid = await generateUnique4DigitUid();

    const pendingTutor = new Tutor({
      uid,
      name: bodyRaw.name,
      email: String(bodyRaw.email).toLowerCase(),
      phone: String(bodyRaw.phone),
      password: hashedPassword,
      city: bodyRaw.city,
      area: bodyRaw.area,
      address: bodyRaw.address || null,
      homeAddress: bodyRaw.homeAddress || null,
      classSubjects,
      profilePicture: profilePicturePath,
      videoLink: bodyRaw.videoLink,
      gender: bodyRaw.gender,
      experienceYears: Number(bodyRaw.experienceYears) || 0,
      experienceMonths: Number(bodyRaw.experienceMonths) || 0,
      collegeName: bodyRaw.collegeName,
      graduationYear: Number(bodyRaw.graduationYear) || null,
      major: bodyRaw.major,
      selfDescription: bodyRaw.selfDescription,
      skillsDescription: bodyRaw.skillsDescription || null,
      agree: bodyRaw.agree === "true" || bodyRaw.agree === true || false,
      paymentInfo: { id: null, amount: REGISTRATION_FEE, currency: "INR", method: null, paymentStatus: "unpaid", paidAt: null },
      submittedAt: bodyRaw.submittedAt ? new Date(bodyRaw.submittedAt) : undefined,
    });

    const line_items = [{
      price_data: {
        currency: "inr",
        product_data: { name: "Tutor Registration Fee" },
        unit_amount: REGISTRATION_FEE * 100,
      },
      quantity: 1,
    }];

    const registrationId = `REG-${uuidv4()}`;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: pendingTutor.email,
      success_url: `${FRONTEND_URL}/fullregistor-tutor?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/fullregistor-tutor?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { registrationId, tutorUid: uid },
    });

    pendingTutor.sessionId = session.id;
    await pendingTutor.save();

    return res.status(201).json({
      success: true,
      message: "Checkout session created",
      checkoutUrl: session.url,
      sessionId: session.id,
      registrationId,
      tutorUid: uid,
    });
  } catch (err) {
    console.error("createRegistrationSession:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/* ------------------ Confirm Stripe payment ------------------ */
export const confirmRegistrationPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ success: false, message: "session_id required" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session) return res.status(400).json({ success: false, message: "Invalid session" });
    if (session.payment_status !== "paid") return res.status(400).json({ success: false, message: "Payment not completed" });

    let tutor = await Tutor.findOne({ sessionId: session_id });
    if (!tutor && session.metadata && session.metadata.tutorUid) {
      tutor = await Tutor.findOne({ uid: String(session.metadata.tutorUid) });
    }
    if (!tutor) return res.status(404).json({ success: false, message: "Pending registration not found" });

    const paymentInfo = {
      amount: session.amount_total ? Number(session.amount_total) / 100 : REGISTRATION_FEE,
      currency: session.currency || "INR",
      method: session.payment_method_types && session.payment_method_types.length ? session.payment_method_types[0] : "card",
      paymentStatus: "paid",
      paidAt: session.created ? new Date(session.created * 1000) : new Date(),
    };

    tutor.paymentInfo = paymentInfo;
    tutor.sessionId = undefined;
    await tutor.save();

    const token = signToken(tutor);
    const out = sanitizeTutor(tutor);

    return res.json({ success: true, message: "Payment confirmed; registration complete", tutor: out, token });
  } catch (err) {
    console.error("confirmRegistrationPayment:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/* ------------------ Tutors listing & filters ------------------ */
export const getTutors = async (req, res) => {
  try {
    const {
      q, city, area, class: className, subject, gender, experience, page = 1, limit = 20,
    } = req.query;

    const mongoQuery = {};
    if (q) {
      const re = new RegExp(String(q).trim(), "i");
      mongoQuery.$or = [{ name: re }, { email: re }, { uid: re }];
    }
    if (city) mongoQuery.city = city;
    if (area) mongoQuery.area = area;
    if (gender) mongoQuery.gender = gender;

    if (experience) {
      const parts = String(experience).split("-").map((p) => p.trim()).filter(Boolean);
      if (parts.length === 1) mongoQuery.experienceYears = { $gte: Number(parts[0]) };
      else if (parts.length === 2) {
        const min = Number(parts[0]) || 0;
        const max = Number(parts[1]) || 100;
        mongoQuery.experienceYears = { $gte: min, $lte: max };
      }
    }

    if (className) mongoQuery[`classSubjects.${className}`] = { $exists: true };

    const pg = Math.max(1, Number(page));
    const lim = Math.min(100, Number(limit) || 20);
    const skip = (pg - 1) * lim;

    // ensure we *include* lastLogin (no projection removing it)
    const tutors = await Tutor.find(mongoQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(lim)
      .lean();

    let filtered = tutors;
    if (subject) {
      const subLower = String(subject).toLowerCase();
      filtered = tutors.filter((t) => {
        const cs = t.classSubjects;
        if (!cs) return false;
        const values = Array.isArray(cs) ? cs.flat() : Object.values(cs).flat();
        return values.some((s) => String(s).toLowerCase().includes(subLower));
      });
    }

    const totalCount = await Tutor.countDocuments(mongoQuery);

    // map and sanitize explicitly
    const out = filtered.map((t) => {
      // remove sensitive fields if present
      delete t.password;
      delete t.sessionId;

      // format lastLogin and fall back to updatedAt if useful
      let lastLoginFormatted = "N/A";
      if (t.lastLogin) lastLoginFormatted = new Date(t.lastLogin).toLocaleString();
      else if (t.updatedAt) lastLoginFormatted = new Date(t.updatedAt).toLocaleString();

      // keep the original lastLogin raw value as well (optional)
      return {
        ...t,
        lastLogin: t.lastLogin || null,
        lastLoginFormatted,
      };
    });

    return res.json({ success: true, tutors: out, total: totalCount, page: pg, limit: lim });
  } catch (err) {
    console.error("getTutors:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


/* ------------------ Single tutor retrieval ------------------ */
export const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    let tutor = null;
    if (mongoose.Types.ObjectId.isValid(id)) tutor = await Tutor.findById(id).lean();
    if (!tutor) tutor = await Tutor.findOne({ uid: id }).lean();
    if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });

    const requester = req.tutor || null;
    const requesterId = requester ? String(requester._id || requester.id || "") : "";
    const targetId = String(tutor._id);
    const isOwner = requester && requesterId === targetId;

    if (isOwner) {
      delete tutor.password;
      delete tutor.sessionId;
      return res.json({ success: true, tutor });
    }

    delete tutor.password;
    delete tutor.sessionId;
    delete tutor.__v;
    return res.json({ success: true, tutor });
  } catch (err) {
    console.error("getTutorById:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/* ------------------ Update profile (auth required) ------------------ */
export const updateProfile = async (req, res) => {
  try {
    if (!req.tutor) return res.status(401).json({ success: false, message: "Not authenticated" });

    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    let tutor = null;
    if (mongoose.Types.ObjectId.isValid(id)) tutor = await Tutor.findById(id);
    if (!tutor) tutor = await Tutor.findOne({ uid: id });
    if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });

    const requesterId = String(req.tutor._id);
    const targetId = String(tutor._id);
    if (requesterId !== targetId) return res.status(403).json({ success: false, message: "Forbidden: cannot update another tutor's profile" });

    const body = req.body || {};

    // Map frontend field videoUrl to backend videoLink so both work
    if (body.videoUrl !== undefined && body.videoLink === undefined) {
      body.videoLink = body.videoUrl;
    }

    
    if (body.email && String(body.email).toLowerCase() !== String(tutor.email).toLowerCase()) {
      const e = await Tutor.findOne({ email: String(body.email).toLowerCase(), _id: { $ne: tutor._id } });
      if (e) return res.status(409).json({ success: false, message: "Email already in use" });
      tutor.email = String(body.email).toLowerCase();
    }

    if (body.phone && String(body.phone) !== String(tutor.phone)) {
      if (!/^\d{10}$/.test(String(body.phone))) return res.status(400).json({ success: false, message: "phone must be 10 digits" });
      const p = await Tutor.findOne({ phone: String(body.phone), _id: { $ne: tutor._id } });
      if (p) return res.status(409).json({ success: false, message: "Phone already in use" });
      tutor.phone = String(body.phone);
    }

    const allowed = [
      "name","address","homeAddress","city","area","videoLink","gender",
      "experienceYears","experienceMonths","collegeName","graduationYear",
      "major","selfDescription","skillsDescription"
    ];
    for (const f of allowed) if (body[f] !== undefined) tutor[f] = body[f];

    // file upload handling (profile picture)
    if (req.file && req.file.filename) {
      tutor.profilePicture = `/uploads/${req.file.filename}`;
      if (req.file.originalname) tutor.profilePictureName = req.file.originalname;
    } else if (body.profilePicture) {
      tutor.profilePicture = body.profilePicture;
    }

    // classSubjects parsing (accepts JSON string or object)
    if (body.classSubjects !== undefined) {
      let cs = body.classSubjects;
      if (typeof cs === "string" && cs.trim()) {
        try { cs = JSON.parse(cs); } catch {}
      }
      tutor.classSubjects = cs;
    }

    if (body.password) tutor.password = await bcrypt.hash(String(body.password), 10);

    await tutor.save();
    return res.json({ success: true, message: "Profile updated", tutor: sanitizeTutor(tutor) });
  } catch (err) {
    console.error("updateProfile:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


/* ------------------ Auth & deletion ------------------ */
export const loginTutor = async (req, res) => {
  try {
    const { email, uid, password } = req.body || {};
    if (!email || !uid || !password) return res.status(400).json({ success: false, message: "Provide email, uid and password" });

    const tutor = await Tutor.findOne({ email: String(email).toLowerCase(), uid });
    if (!tutor) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), tutor.password || "");
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });
  
    const token = signToken(tutor);
    tutor.lastLogin = new Date();
      await tutor.save();
    return res.json({ success: true, tutor: sanitizeTutor(tutor), token });
  } catch (err) {
    console.error("loginTutor:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "id required" });

    const tutor = await Tutor.findOneAndDelete({ uid: String(id) });
    if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });

    return res.json({ success: true, message: "Tutor deleted", tutor: sanitizeTutor(tutor) });
  } catch (err) {
    console.error("deleteTutor:", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export default {
  createRegistrationSession,
  confirmRegistrationPayment,
  getTutors,
  getTutorById,
  updateProfile,
  loginTutor,
  deleteTutor,
};
