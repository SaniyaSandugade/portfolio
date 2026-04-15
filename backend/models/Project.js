const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      default: ""
    },
    liveUrl: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["Completed", "Ongoing"],
      default: "Completed"
    }
  },
  { timestamps: true }
);

ProjectSchema.index({ title: "text", technologies: 1 });

module.exports = mongoose.model("Project", ProjectSchema);