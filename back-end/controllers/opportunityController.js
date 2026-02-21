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

    // Date validations
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

    // ✅ Manual duplicate check BEFORE insert
    const existing = await Opportunity.findOne({
      title: title.toLowerCase(),
      ngo: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already created an opportunity with this title.",
      });
    }

    const opportunity = await Opportunity.create({
      title,
      description,
      skills,
      duration,
      location,
      startDate,
      endDate,
      applyDeadline,
      ngo: req.user.id,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    // ✅ Database duplicate safety
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

    if (!opportunity)
      return res.status(404).json({ message: "Opportunity not found" });

    // Only owner NGO can edit
    if (opportunity.ngo.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // If title is being updated → check duplicate
    if (req.body.title) {
      const existing = await Opportunity.findOne({
        title: req.body.title.toLowerCase(),
        ngo: req.user.id,
        _id: { $ne: req.params.id }, // exclude current document
      });

      if (existing) {
        return res.status(400).json({
          message: "Another opportunity with this title already exists.",
        });
      }
    }

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

    if (!opportunity)
      return res.status(404).json({ message: "Opportunity not found" });

    if (opportunity.ngo.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await opportunity.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL =================
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ status: "Open" })
      .populate("ngo", "name email");

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET MY =================
exports.getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ ngo: req.user.id });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};