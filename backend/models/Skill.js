const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  proficiency: Number,
  icon: String
});

module.exports = mongoose.model("Skill", SkillSchema);
