import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import Admin from "../models/adminModel.js";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function register(req, res) {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    name = String(name).trim();
    email = String(email).toLowerCase().trim();
    password = String(password);

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email." });
    }

    const exists = await Admin.findOne({ email }).lean();
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists." });
    }

    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      _id: newId,
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined on the server");

    const token = jwt.sign({ id: newId.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "Admin account created successfully.",
      token,
      admin: { id: admin._id.toString(), name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}

export async function login(req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    email = String(email).toLowerCase().trim();
    password = String(password);

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined on the server");

    const token = jwt.sign({ id: admin._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      admin: { id: admin._id.toString(), name: admin.name, email: admin.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
}
