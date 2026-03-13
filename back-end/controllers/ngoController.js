const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerNGO = async (req, res) => {
  try {
    const { organizationName, email, password, location, description, website } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const ngo = await User.create({
      name: organizationName,
      organizationName,
      email,
      password: hashed,
      role: "ngo",
      location,
      description,
      website
    });

    res.json({
      _id: ngo._id,
      name: ngo.name,
      email: ngo.email,
      role: ngo.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await User.findOne({ email, role: "ngo" });
    if (!ngo) return res.status(400).json({ message: "NGO not found" });

    const match = await bcrypt.compare(password, ngo.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        _id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        role: ngo.role,
        location: ngo.location,
        description: ngo.description,
        website: ngo.website
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};