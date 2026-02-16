const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerNGO = async (req, res) => {
  const { organizationName, email, password, location, description, website } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const ngo = await User.create({
    name: organizationName,
    email,
    password: hashed,
    role: "ngo",
    location,
    description,
    website
  });

  res.json(ngo);
};

exports.loginNGO = async (req, res) => {
  const { email, password } = req.body;

  const ngo = await User.findOne({ email, role: "ngo" });
  if (!ngo) return res.status(400).json({ message: "NGO not found" });

  const match = await bcrypt.compare(password, ngo.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET);

  res.json({ token, role: ngo.role });
};
