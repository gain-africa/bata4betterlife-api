const Contact = require("../models/contact.model");

// get all published blogs
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    return res.json({
      status: true,
      data: contacts,
    });
  } catch (err) {
    err.source = "get all contacts controller";
    next(err);
  }
};

// get a published blog
const getAContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    return res.json({
      status: true,
      data: contact,
    });
  } catch (err) {
    err.source = "get a contact controller";
    next(err);
  }
};

// create a contact detail
const createContact = async (req, res, next) => {
  try {
    // create a new contact
    const contact = await Contact.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Contact created successfully",
      data: contact,
    });
  } catch (err) {
    err.source = "create contact conroller";
    next(err);
  }
};

module.exports = {
  getAllContacts,
  getAContact,
  createContact,
};
