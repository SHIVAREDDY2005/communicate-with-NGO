const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);
