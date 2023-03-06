const express = require("express");
const router = express.Router();
const {
  createContact,
  getAContact,
  getAllContacts,
} = require("../controllers/Contact.controller");
const { addContactValidationMW } = require("../validations/Contact.validator");

router.get("/", getAllContacts);
router.get("/:id", getAContact);
router.post("/", addContactValidationMW, createContact);

module.exports = router;
