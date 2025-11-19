import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { upload, File } from "./upload.js";

dotenv.config();

const app = express();
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend UI from public folder
app.use(express.static(path.join(__dirname, "public")));


// MongoDB Connect

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
})();

// ----------------------------
//  Upload Route
// ----------------------------
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const newFile = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size, // size in bytes
    });

    await newFile.save();

    res.json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

// ----------------------------
//  Get All Uploaded Files
// ----------------------------
app.get("/files", async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ message: "Could not fetch files" });
  }
});

// ----------------------------
//  Download Route
// ----------------------------
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).json({ message: "Download failed" });
    }
  });
});
// Delete a file
app.delete("/files/:id", async (req, res) => {
  try {
    // Find the file in DB by its MongoDB _id
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete file from uploads folder
    const filePath = path.join(process.cwd(), "uploads", file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete file record from MongoDB
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete file" });
  }
});


// ----------------------------
//  Start Server
// ----------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

