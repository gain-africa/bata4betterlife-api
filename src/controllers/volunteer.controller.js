const Volunteer = require("../models/volunteers.model");

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
    const volunteer = await Volunteer.findById(id);

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
    // create a new volunteer
    const volunteer = await Volunteer.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Volunteer created successfully",
      data: volunteer,
    });
  } catch (err) {
    err.source = "create volunteers conroller";
    next(err);
  }
};

module.exports = {
  getAllVolunteers,
  getAVolunteer,
  createVolunteer,
};
