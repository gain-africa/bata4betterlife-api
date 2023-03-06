const express = require("express");
const router = express.Router();
const {
  createContact,
  getAContact,
  getAllContacts,
} = require("../controllers/Contact.controller");
const { addContactValidationMW } = require("../validations/Contact.validator");
const { authenticateUser } = require("../authentication/auth");

router.get("/", authenticateUser, getAllContacts);
router.get("/:id", authenticateUser, getAContact);
router.post("/", addContactValidationMW, createContact);

module.exports = router;
