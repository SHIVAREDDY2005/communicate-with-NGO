const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "withdrawn", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Prevent duplicate application
applicationSchema.index(
  { opportunity: 1, volunteer: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);