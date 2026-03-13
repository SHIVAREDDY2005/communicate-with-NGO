const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER VOLUNTEER
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, location, skills } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const volunteer = await User.create({
      name,
      email,
      password: hashed,
      role: "volunteer",
      location,
      skills
    });

    res.status(201).json({
      _id: volunteer._id,
      name: volunteer.name,
      email: volunteer.email,
      role: volunteer.role
    });

  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN VOLUNTEER
exports.loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await User.findOne({ email, role: "volunteer" });
    if (!volunteer)
      return res.status(400).json({ message: "Volunteer not found" });

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: volunteer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        role: volunteer.role,
        location: volunteer.location,
        skills: volunteer.skills
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
