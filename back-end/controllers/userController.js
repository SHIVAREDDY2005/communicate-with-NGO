const bcrypt = require("bcryptjs");

const User = require("../models/User");

const sanitizeUser = (user) => {
  if (!user) return null;
  const plain = user.toObject ? user.toObject() : { ...user };
  delete plain.password;
  return plain;
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};

exports.getNgoOrganization = async (req, res) => {
  if (req.user.role !== "ngo") {
    return res.status(403).json({ message: "Only NGOs can access this endpoint" });
  }

  return res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {};

    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.location !== undefined) updates.location = req.body.location;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.website !== undefined) updates.website = req.body.website;

    if (req.body.organizationName !== undefined) {
      updates.organizationName = req.body.organizationName;
      if (req.user.role === "ngo") {
        updates.name = req.body.organizationName;
      }
    }

    if (req.body.skills !== undefined) {
      updates.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : String(req.body.skills)
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);
    }

    if (req.body.email && req.body.email !== req.user.email) {
      const existing = await User.findOne({ email: req.body.email.toLowerCase() });
      if (existing && String(existing._id) !== String(req.user._id)) {
        return res.status(400).json({ message: "Email already in use" });
      }
      updates.email = req.body.email.toLowerCase();
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

exports.getNgoMembers = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Only NGOs can view members" });
    }

    const organizationName = req.user.organizationName || req.user.name;
    const adminId = req.user.parentNgo || req.user._id;

    const members = await User.find({
      role: "ngo",
      $or: [
        { _id: adminId },
        { parentNgo: adminId },
        ...(organizationName
          ? [{ organizationName }, { name: organizationName }]
          : []),
      ],
    })
      .select("-password")
      .sort({ createdAt: -1 });

    const unique = Array.from(
      new Map(members.map((member) => [String(member._id), member])).values()
    );

    res.json(unique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addNgoMember = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Only NGOs can add members" });
    }

    if (req.user.ngoRole && req.user.ngoRole !== "admin") {
      return res.status(403).json({ message: "Only NGO admins can add members" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const adminId = req.user.parentNgo || req.user._id;
    const organizationName = req.user.organizationName || req.user.name;
    const hashed = await bcrypt.hash(password, 10);

    const member = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: "ngo",
      ngoRole: "member",
      parentNgo: adminId,
      organizationName,
      location: req.user.location,
      description: req.user.description,
      website: req.user.website,
    });

    res.status(201).json({ user: sanitizeUser(member) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
