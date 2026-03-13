const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    location: String,
    category: String,

    skillsRequired: [String],

    volunteersNeeded: Number,

    applyDeadline: Date,

    duration: String, // ✅ added for filtering

    status: {
      type: String,
      default: "open" // ✅ lowercase fixed
    },

    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);