const Opportunity = require("../models/Opportunity");

exports.createOpportunity = async (req, res) => {
  const opportunity = await Opportunity.create({
    title: req.body.title,
    description: req.body.description,
    ngo: req.user._id
  });

  res.json(opportunity);
};

exports.getOpportunities = async (req, res) => {
  const opportunities = await Opportunity.find().populate("ngo", "name");
  res.json(opportunities);
};
