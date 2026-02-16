const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerVolunteer = async (req, res) => {
  const { name, email, password, location, skills } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const volunteer = await User.create({
    name,
    email,
    password: hashed,
    role: "volunteer",
    location,
    skills
  });

  res.json(volunteer);
};

exports.loginVolunteer = async (req, res) => {
  const { email, password } = req.body;

  const volunteer = await User.findOne({ email, role: "volunteer" });
  if (!volunteer) return res.status(400).json({ message: "Volunteer not found" });

  const match = await bcrypt.compare(password, volunteer.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET);

  res.json({ token, role: volunteer.role });
};
