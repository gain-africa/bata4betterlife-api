const express = require("express");
const router = express.Router();
const {
  createContact,
  getAContact,
  getAllContacts,
} = require("../controllers/contact.controller");
const { addContactValidationMW } = require("../validations/Contact.validator");
const { authenticateUser } = require("../authentication/auth");
const { sendContactMail } = require("../services/mail.services");

router.get("/", authenticateUser, getAllContacts);
router.get("/:id", authenticateUser, getAContact);
router.post("/", addContactValidationMW, sendContactMail, createContact);

module.exports = router;
