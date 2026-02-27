const Opportunity = require("../models/Opportunity");

// ================= CREATE =================
exports.createOpportunity = async (req, res) => {
  try {
    const {
      title,
      description,
      skills,
      duration,
      location,
      startDate,
      endDate,
      applyDeadline,
    } = req.body;

    // ===== Basic Validation =====
    if (!title || !description || !startDate || !endDate || !applyDeadline) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // ===== Normalize Title =====
    const normalizedTitle = title.trim().toLowerCase();

    // ===== Date Validation =====
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({
        message: "Start date must be before end date",
      });
    }

    if (new Date(applyDeadline) > new Date(startDate)) {
      return res.status(400).json({
        message: "Apply deadline must be before start date",
      });
    }

    // ===== Duplicate Check =====
    const existing = await Opportunity.findOne({
      title: normalizedTitle,
      ngo: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already created an opportunity with this title.",
      });
    }

    // ===== Create =====
    const opportunity = await Opportunity.create({
      title: normalizedTitle,
      description,
      skills,
      duration,
      location,
      startDate,
      endDate,
      applyDeadline,
      ngo: req.user.id,
      status: "Open",
    });

    res.status(201).json(opportunity);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate opportunity title for this NGO.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE =================
exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // ===== Authorization =====
    if (opportunity.ngo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ===== Normalize Title if updating =====
    if (req.body.title) {
      const normalizedTitle = req.body.title.trim().toLowerCase();

      const existing = await Opportunity.findOne({
        title: normalizedTitle,
        ngo: req.user.id,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return res.status(400).json({
          message: "Another opportunity with this title already exists.",
        });
      }

      req.body.title = normalizedTitle;
    }

    // ===== Date Validation =====
    const newStartDate = req.body.startDate || opportunity.startDate;
    const newEndDate = req.body.endDate || opportunity.endDate;
    const newApplyDeadline =
      req.body.applyDeadline || opportunity.applyDeadline;

    if (new Date(newStartDate) > new Date(newEndDate)) {
      return res.status(400).json({
        message: "Start date must be before end date",
      });
    }

    if (new Date(newApplyDeadline) > new Date(newStartDate)) {
      return res.status(400).json({
        message: "Apply deadline must be before start date",
      });
    }

    // ===== Update =====
    const updated = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate opportunity title.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    if (opportunity.ngo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await opportunity.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      status: "Open",
      applyDeadline: { $gte: new Date() }, // Hide expired
    }).populate("ngo", "name email");

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MY =================
exports.getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({
      ngo: req.user.id,
    });

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= NGO DASHBOARD =================
exports.getDashboardStats = async (req, res) => {
  try {
    const ngoId = req.user.id;

    const total = await Opportunity.countDocuments({ ngo: ngoId });

    const open = await Opportunity.countDocuments({
      ngo: ngoId,
      status: "Open",
    });

    const closed = await Opportunity.countDocuments({
      ngo: ngoId,
      status: "Closed",
    });

    res.json({
      totalOpportunities: total,
      openOpportunities: open,
      closedOpportunities: closed,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL (ADVANCED SEARCH + FILTER) =================
exports.getAllOpportunities = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const {
      search,
      location,
      ngo,
      skill,
      minStipend,
      maxStipend
    } = req.query;

    const query = {};

    // ✅ Only show active opportunities
    query.applyDeadline = { $gte: new Date() };

    // 🔍 Search (title + description + skills)
    if (search) {
      const regex = new RegExp(search, "i");

      query.$or = [
        { title: regex },
        { description: regex },
        { skills: { $elemMatch: { $regex: regex } } }
      ];
    }

    // 📍 Location filter
    if (location) {
      query.location = location;
    }

    // 🏢 NGO filter
    if (ngo) {
      query.ngo = ngo;
    }

    // 🛠 Skill filter (exact skill match)
    if (skill) {
      query.skills = { $in: [skill] };
    }

    // 💰 Stipend range filter
    if (minStipend || maxStipend) {
      query.stipend = {};
      if (minStipend) query.stipend.$gte = Number(minStipend);
      if (maxStipend) query.stipend.$lte = Number(maxStipend);
    }

    console.log("FINAL QUERY:", query);

    const opportunities = await Opportunity.find(query)
      .populate("ngo", "name email")
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Opportunity.countDocuments(query);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      opportunities,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};