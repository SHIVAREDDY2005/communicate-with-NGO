const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["volunteer", "ngo"],
    required: true
  },
  ngoRole: {
    type: String,
    enum: ["admin", "member"],
    default: function defaultNgoRole() {
      return this.role === "ngo" ? "admin" : undefined;
    }
  },
  parentNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  location: String,
  skills: [String],
  organizationName: String,
  description: String,
  website: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
