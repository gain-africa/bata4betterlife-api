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
const { authenticateUser } = require("../authentication/auth");

router.get("/", authenticateUser, getAllVolunteers);
router.get("/:id", authenticateUser, getAVolunteer);
router.post("/", createVolunteer);

module.exports = router;
