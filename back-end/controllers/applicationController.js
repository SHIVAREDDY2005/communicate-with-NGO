const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");

/* ================= APPLY ================= */
exports.apply = async (req, res) => {
  try {
    const { opportunity, message } = req.body;

    const opp = await Opportunity.findById(opportunity);

    if (!opp) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // ✅ FIXED (lowercase check)
    if (opp.status !== "open") {
      return res.status(400).json({ message: "Opportunity is closed" });
    }

    if (opp.applyDeadline && new Date() > new Date(opp.applyDeadline)) {
      return res.status(400).json({
        message: "Application deadline has passed",
      });
    }

    const existing = await Application.findOne({
      opportunity,
      volunteer: req.user._id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "You already applied to this opportunity" });
    }

    const application = await Application.create({
      opportunity,
      volunteer: req.user._id,
      message,
      status: "pending" // ✅ ensure default
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= VOLUNTEER VIEW ================= */
exports.myApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      volunteer: req.user._id,
    })
      .populate("opportunity", "title location status")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= NGO VIEW APPLICANTS ================= */
exports.getApplicants = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({
      opportunity: req.params.opportunityId,
    })
      .populate("volunteer", "name email skills")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= ACCEPT / REJECT ================= */
exports.updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected",
      });
    }

    const application = await Application.findById(req.params.id)
      .populate({
        path: "opportunity",
        select: "ngo",
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (
      application.opportunity.ngo.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UNDO APPLICATION ================= */
exports.undoApplication = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const application = await Application.findOneAndDelete({
      opportunity: opportunityId,
      volunteer: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application withdrawn successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ================= NGO VIEW ALL APPLICANTS ================= */
/* ================= NGO VIEW ALL APPLICANTS ================= */
exports.getAllApplicantsForNGO = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find()
      .populate({
        path: "opportunity",
        select: "title ngo",
        match: { ngo: req.user._id } // only this NGO's opportunities
      })
      .populate("volunteer", "name email skills")
      .sort({ createdAt: -1 });

    // Remove applications where opportunity didn't match NGO
    const filtered = applications.filter(app => app.opportunity);

    res.json(filtered);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};