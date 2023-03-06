const express = require("express");
const router = express.Router();
const {
  createVolunteer,
  getAVolunteer,
  getAllVolunteers,
} = require("../controllers/volunteer.controller");
const {
  addVolunteerValidationMW,
} = require("../validations/volunteer.validator");

router.get("/", getAllVolunteers);
router.get("/:id", getAVolunteer);
router.post("/", addVolunteerValidationMW, createVolunteer);

module.exports = router;
