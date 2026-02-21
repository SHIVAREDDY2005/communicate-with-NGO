const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // prevents case duplicates
    },
    description: {
      type: String,
      required: true,
    },
    skills: [String],
    duration: String,
    location: String,
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    applyDeadline: {
      type: Date,
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);

// ✅ Unique per NGO (compound index)
opportunitySchema.index({ title: 1, ngo: 1 }, { unique: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);