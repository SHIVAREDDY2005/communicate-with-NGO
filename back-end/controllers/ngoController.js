const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const sanitizeUser = (user) => {
  if (!user) return null;
  const plain = user.toObject ? user.toObject() : { ...user };
  delete plain.password;
  return plain;
};

exports.registerNGO = async (req, res) => {
  try {
    const {
      organizationName,
      name,
      email,
      password,
      location,
      description,
      website,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const orgName = organizationName || name || "";

    const ngo = await User.create({
      name: orgName,
      organizationName: orgName,
      email: email.toLowerCase(),
      password: hashed,
      role: "ngo",
      ngoRole: "admin",
      location,
      description,
      website,
    });

    res.status(201).json({ user: sanitizeUser(ngo) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await User.findOne({ email: email?.toLowerCase(), role: "ngo" });
    if (!ngo) return res.status(400).json({ message: "NGO not found" });

    const match = await bcrypt.compare(password, ngo.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET);

    res.json({ token, user: sanitizeUser(ngo), role: ngo.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNgoProfile = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Only NGOs can update this profile" });
    }

    const updates = {};

    if (req.body.organizationName) {
      updates.organizationName = req.body.organizationName;
      updates.name = req.body.organizationName;
    }

    if (req.body.name) {
      updates.name = req.body.name;
      if (!req.body.organizationName) {
        updates.organizationName = req.body.name;
      }
    }

    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.website !== undefined) updates.website = req.body.website;

    const updated = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
