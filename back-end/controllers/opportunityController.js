const Opportunity = require("../models/Opportunity");

/* helper to compute real status */
const computeStatus = (opp) => {
  if (opp.applyDeadline && new Date(opp.applyDeadline) < new Date()) {
    return "closed";
  }
  return "open";
};

/* CREATE */
exports.createOpportunity = async (req, res) => {
  try {
    if (req.user.role !== "ngo")
      return res.status(403).json({ message: "Access denied" });

    const opportunity = await Opportunity.create({
      ...req.body,
      status: "open",
      ngo: req.user._id,
    });

    res.json(opportunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL WITH FILTER */
exports.getOpportunities = async (req, res) => {
  try {
    const { skill, location, duration } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (duration) {
      filter.duration = duration;
    }

    let opportunities = await Opportunity.find(filter).populate("ngo", "name");

    /* compute correct status */
    opportunities = opportunities.map((o) => {
      const obj = o.toObject();
      obj.status = computeStatus(o);
      return obj;
    });

    /* only show open opportunities to volunteers */
    opportunities = opportunities.filter(o => o.status === "open");

    if (skill) {
      opportunities = opportunities.filter(o =>
        o.skillsRequired?.some(s =>
          s.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }

    res.json(opportunities);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* NGO MY OPPORTUNITIES */
exports.getMyOpportunities = async (req, res) => {
  try {
    if (req.user.role !== "ngo")
      return res.status(403).json({ message: "Access denied" });

    let opportunities = await Opportunity.find({ ngo: req.user._id });

    opportunities = opportunities.map((o) => {
      const obj = o.toObject();
      obj.status = computeStatus(o);
      return obj;
    });

    res.json(opportunities);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
exports.updateOpportunity = async (req, res) => {
  try {
    if (req.user.role !== "ngo")
      return res.status(403).json({ message: "Access denied" });

    const opp = await Opportunity.findById(req.params.id);

    if (!opp)
      return res.status(404).json({ message: "Opportunity not found" });

    if (opp.ngo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(opp, req.body);
    await opp.save();

    res.json(opp);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
exports.deleteOpportunity = async (req, res) => {
  try {
    if (req.user.role !== "ngo")
      return res.status(403).json({ message: "Access denied" });

    const opp = await Opportunity.findById(req.params.id);

    if (!opp)
      return res.status(404).json({ message: "Not found" });

    if (opp.ngo.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await opp.deleteOne();

    res.json({ message: "Deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};