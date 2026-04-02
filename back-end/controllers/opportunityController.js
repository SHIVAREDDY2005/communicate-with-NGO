const Opportunity = require("../models/Opportunity");

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const normalizeStatus = (status) => {
  if (!status) return undefined;
  const normalized = String(status).trim().toLowerCase();
  if (normalized === "open") return "Open";
  if (normalized === "closed") return "Closed";
  return undefined;
};

const normalizeSkills = (skills, skillsRequired) => {
  const source = skillsRequired ?? skills;

  if (Array.isArray(source)) {
    return source.map((value) => String(value).trim()).filter(Boolean);
  }

  if (typeof source === "string") {
    return source
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return [];
};

const toValidDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const computeDates = (payload = {}, existing = {}) => {
  const now = new Date();

  const applyDeadline =
    toValidDate(payload.applyDeadline) ||
    toValidDate(existing.applyDeadline) ||
    new Date(now.getTime() + 7 * ONE_DAY_MS);

  const startDate =
    toValidDate(payload.startDate) ||
    toValidDate(existing.startDate) ||
    new Date(applyDeadline.getTime() + ONE_DAY_MS);

  const endDate =
    toValidDate(payload.endDate) ||
    toValidDate(existing.endDate) ||
    new Date(startDate.getTime() + 30 * ONE_DAY_MS);

  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }

  if (applyDeadline > startDate) {
    throw new Error("Apply deadline must be before start date");
  }

  return { applyDeadline, startDate, endDate };
};

const mapOpportunity = (opportunity) => {
  const base = opportunity.toObject ? opportunity.toObject() : { ...opportunity };
  const skills =
    (Array.isArray(base.skillsRequired) && base.skillsRequired.length > 0
      ? base.skillsRequired
      : base.skills) || [];

  return {
    ...base,
    skills,
    skillsRequired: skills,
    positions: base.positions ?? base.volunteersNeeded ?? null,
    status: String(base.status || "Open").toLowerCase(),
  };
};

const buildOpportunityPayload = (payload, existingOpportunity) => {
  const skills = normalizeSkills(payload.skills, payload.skillsRequired);
  const { applyDeadline, startDate, endDate } = computeDates(
    payload,
    existingOpportunity || {}
  );

  const parsedVolunteersNeeded = Number(
    payload.volunteersNeeded ?? payload.positions
  );
  const volunteersNeeded = Number.isFinite(parsedVolunteersNeeded)
    ? parsedVolunteersNeeded
    : existingOpportunity?.volunteersNeeded;

  const normalizedStatus =
    normalizeStatus(payload.status) || existingOpportunity?.status || "Open";

  return {
    title: payload.title,
    description: payload.description,
    location: payload.location,
    category: payload.category,
    duration: payload.duration,
    skills,
    skillsRequired: skills,
    volunteersNeeded,
    positions: volunteersNeeded,
    applyDeadline,
    startDate,
    endDate,
    status: normalizedStatus,
  };
};

exports.createOpportunity = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Please provide title and description",
      });
    }

    const normalizedTitle = title.trim().toLowerCase();

    const existing = await Opportunity.findOne({
      title: normalizedTitle,
      ngo: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already created an opportunity with this title.",
      });
    }

    const payload = buildOpportunityPayload(req.body);

    const opportunity = await Opportunity.create({
      ...payload,
      title: normalizedTitle,
      ngo: req.user.id,
    });

    res.status(201).json(mapOpportunity(opportunity));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate opportunity title for this NGO.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    if (opportunity.ngo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updates = buildOpportunityPayload(req.body, opportunity);

    if (req.body.title) {
      const normalizedTitle = req.body.title.trim().toLowerCase();

      const duplicate = await Opportunity.findOne({
        title: normalizedTitle,
        ngo: req.user.id,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(400).json({
          message: "Another opportunity with this title already exists.",
        });
      }

      updates.title = normalizedTitle;
    } else {
      delete updates.title;
    }

    if (!req.body.description) delete updates.description;
    if (!req.body.location) delete updates.location;
    if (!req.body.category) delete updates.category;
    if (!req.body.duration) delete updates.duration;
    if (req.body.volunteersNeeded == null && req.body.positions == null) {
      delete updates.volunteersNeeded;
      delete updates.positions;
    }
    if (!req.body.status) delete updates.status;

    const updated = await Opportunity.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(mapOpportunity(updated));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate opportunity title.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

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

exports.getAllOpportunities = async (req, res) => {
  try {
    const {
      search,
      location,
      ngo,
      skill,
      duration,
      status,
    } = req.query;

    const filters = [];

    filters.push({ applyDeadline: { $gte: new Date() } });

    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus) {
      filters.push({ status: normalizedStatus });
    } else {
      filters.push({ status: { $in: ["Open", "open"] } });
    }

    if (location) {
      filters.push({ location: new RegExp(location, "i") });
    }

    if (duration) {
      filters.push({ duration: new RegExp(duration, "i") });
    }

    if (ngo) {
      filters.push({ ngo });
    }

    if (skill) {
      const skillRegex = new RegExp(skill, "i");
      filters.push({
        $or: [
          { skills: { $elemMatch: { $regex: skillRegex } } },
          { skillsRequired: { $elemMatch: { $regex: skillRegex } } },
        ],
      });
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      filters.push({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { skills: { $elemMatch: { $regex: searchRegex } } },
          { skillsRequired: { $elemMatch: { $regex: searchRegex } } },
        ],
      });
    }

    const query = filters.length === 1 ? filters[0] : { $and: filters };

    const opportunities = await Opportunity.find(query)
      .populate("ngo", "name email organizationName role")
      .sort({ createdAt: -1 });

    res.json(opportunities.map(mapOpportunity));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ ngo: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(opportunities.map(mapOpportunity));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const ngoId = req.user.id;

    const total = await Opportunity.countDocuments({ ngo: ngoId });
    const open = await Opportunity.countDocuments({
      ngo: ngoId,
      status: { $in: ["Open", "open"] },
    });
    const closed = await Opportunity.countDocuments({
      ngo: ngoId,
      status: { $in: ["Closed", "closed"] },
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
