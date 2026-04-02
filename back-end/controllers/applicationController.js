const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// ================= APPLY =================
exports.apply = async (req, res) => {
  try {
    const { opportunity, message } = req.body;

    const opp = await Opportunity.findById(opportunity);

    if (!opp) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Check if opportunity is closed manually
    if (String(opp.status).toLowerCase() !== "open") {
      return res.status(400).json({ message: "Opportunity is closed" });
    }

    // ✅ ADD THIS: Deadline validation
    if (new Date() > new Date(opp.applyDeadline)) {
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
    });

    // Ensure NGO <-> Volunteer conversation exists when someone applies
    // so both users can immediately see each other in the message section.
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, opp.ngo] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, opp.ngo],
      });
    }

    // Seed chat with the application message as first thread message.
    if (message && String(message).trim()) {
      const firstMessage = await Message.create({
        conversationId: conversation._id,
        sender: req.user._id,
        text: String(message).trim(),
      });

      conversation.lastMessage = firstMessage._id;
      await conversation.save();
    }

    res.status(201).json(application);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// ================= VOLUNTEER VIEW =================
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

// ================= NGO VIEW APPLICANTS =================
exports.getApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      opportunity: req.params.opportunityId,
    })
      .populate("volunteer", "name email")
      .populate("opportunity", "title status applyDeadline")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= NGO ALL APPLICATIONS =================
exports.getNgoApplications = async (req, res) => {
  try {
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Only NGOs can view applicants" });
    }

    const ngoOpportunities = await Opportunity.find({ ngo: req.user._id }).select(
      "_id"
    );

    const opportunityIds = ngoOpportunities.map((opp) => opp._id);

    if (opportunityIds.length === 0) {
      return res.json([]);
    }

    const applications = await Application.find({
      opportunity: { $in: opportunityIds },
    })
      .populate("volunteer", "name email")
      .populate("opportunity", "title status applyDeadline")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ACCEPT / REJECT =================
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected",
      });
    }

    // 🔥 populate opportunity INCLUDING ngo field
    const application = await Application.findById(req.params.id)
      .populate({
        path: "opportunity",
        select: "ngo",
      });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    if (req.user.role !== "ngo") {
      return res.status(403).json({ message: "Only NGOs can update status" });
    }
    // 🔥 Safe comparison
    if (
      !application.opportunity ||
      application.opportunity.ngo.toString() !== req.user._id.toString()
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
// ================= UNDO APPLICATION =================
exports.undoApplication = async (req, res) => {
  try {
    const { opportunityId } = req.params;

    const application = await Application.findOne({
      opportunity: opportunityId,
      volunteer: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status === "accepted") {
      return res.status(400).json({
        message: "Cannot withdraw after being accepted",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      message: "Application withdrawn successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
