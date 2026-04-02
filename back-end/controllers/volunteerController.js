const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const sanitizeUser = (user) => {
  if (!user) return null;
  const plain = user.toObject ? user.toObject() : { ...user };
  delete plain.password;
  return plain;
};

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, location, skills } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const volunteer = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "volunteer",
      location,
      skills: Array.isArray(skills)
        ? skills
        : typeof skills === "string"
          ? skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
    });

    res.status(201).json({ user: sanitizeUser(volunteer) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await User.findOne({
      email: email?.toLowerCase(),
      role: "volunteer",
    });
    if (!volunteer) return res.status(400).json({ message: "Volunteer not found" });

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET);

    res.json({ token, user: sanitizeUser(volunteer), role: volunteer.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVolunteerProfile = async (req, res) => {
  try {
    if (req.user.role !== "volunteer") {
      return res
        .status(403)
        .json({ message: "Only volunteers can update this profile" });
    }

    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.website !== undefined) updates.website = req.body.website;

    if (req.body.skills !== undefined) {
      updates.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : String(req.body.skills)
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
    }

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
