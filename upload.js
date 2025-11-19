// upload.js
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

// ----------------------------
//  MongoDB Schema
// ----------------------------
const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  uploadDate: { type: Date, default: Date.now }
});

export const File = mongoose.model("File", fileSchema);

// ----------------------------
//  Multer Storage
// ----------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({ storage });

