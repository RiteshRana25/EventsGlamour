require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" Connection error:", err));

// Schema + Model
const mediaSchema = new mongoose.Schema({
  title: String,
  type: String,
  url: String,
});
const Media = mongoose.model("Media", mediaSchema, "cloudinaryvideo"); 
// Routes
app.get("/api/media", async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

app.post("/api/media", async (req, res) => {
  try {
    const { title, type, url } = req.body;
    const newMedia = new Media({ title, type, url });
    await newMedia.save();
    res.json({ success: true, media: newMedia });
  } catch (err) {
    res.status(500).json({ error: "Failed to insert media" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
