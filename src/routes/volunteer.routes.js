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
const { sendVolunteerMail } = require("../services/mail.services");

router.get("/", authenticateUser, getAllVolunteers);
router.get("/:id", authenticateUser, getAVolunteer);
router.post("/", addVolunteerValidationMW, sendVolunteerMail, createVolunteer);

module.exports = router;
