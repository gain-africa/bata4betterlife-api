const Volunteer = require("../models/volunteer.model");
const { splittingSkills } = require("../utils/skills");

// get all published blogs
const getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await Volunteer.find({});
    return res.json({
      status: true,
      data: volunteers,
    });
  } catch (err) {
    err.source = "get all volunteers controller";
    next(err);
  }
};

// get a published blog
const getAVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Invalid id",
      });
    }

    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.status(404).json({
        status: false,
        message: "Volunteer not found",
      });
    }

    return res.json({
      status: true,
      data: volunteer,
    });
  } catch (err) {
    err.source = "get a volunteers controller";
    next(err);
  }
};

// create a volunteer detail
const createVolunteer = async (req, res, next) => {
  try {
    // split skills
    const skills = splittingSkills(req.body.skills);
    req.body.skills = skills;

    // create a new volunteer
    const volunteer = await Volunteer.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Volunteer created successfully",
      data: volunteer,
    });
  } catch (err) {
    err.source = "create volunteers controller";
    next(err);
  }
};

module.exports = {
  getAllVolunteers,
  getAVolunteer,
  createVolunteer,
};
