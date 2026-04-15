const express = require("express");
const router = express.Router();

const Skill = require("../models/Skill");
const protect = require("../middleware/authMiddleware");

// ✅ CREATE Skill
router.post("/", protect, async (req, res) => {
  try {
    const { name, category, proficiency } = req.body;

    // Validation
    if (!name || !category || proficiency === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const skill = new Skill({
      name,
      category,
      proficiency,
      icon: req.body.icon || ""
    });

    await skill.save();
    res.status(201).json(skill);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ GET All Skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ UPDATE Skill
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ DELETE Skill
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;