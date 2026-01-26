// routes/watchRouter.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createWatch,
  getWatches,
  deleteWatch,
  getWatchesByBrand,
} from "../controllers/watchController.js";

const watchRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads")); // ➜ ./uploads
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `watch-${unique}${ext}`);
  },
});
const upload = multer({ storage });

// routes
watchRouter.post("/", upload.single("image"), createWatch);
watchRouter.get("/", getWatches);
watchRouter.delete("/:id", deleteWatch);
watchRouter.get('/brands/:brandName', getWatchesByBrand);


export default watchRouter;
