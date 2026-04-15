const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../models/Project");

// 🔥 SIMPLE CACHE
let cache = null;

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// CREATE PROJECT (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies.split(","),
      githubUrl: req.body.githubUrl,
      liveUrl: req.body.liveUrl,
      status: req.body.status,
      image: req.file ? req.file.filename : ""
    });

    await project.save();

    // 🔥 CLEAR CACHE AFTER ADD
    cache = null;

    res.json(project);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET PROJECTS (WITH CACHE)
router.get("/", async (req, res) => {
  try {
    // 🔥 RETURN CACHE IF AVAILABLE
    if (cache) {
      return res.json(cache);
    }

    const projects = await Project.find().sort({ createdAt: -1 });

    // 🔥 STORE IN CACHE
    cache = projects;

    // 🔥 AUTO CLEAR CACHE AFTER 10s
    setTimeout(() => {
      cache = null;
    }, 10000);

    res.json(projects);

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    // 🔥 CLEAR CACHE AFTER DELETE
    cache = null;

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;