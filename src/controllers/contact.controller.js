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
    if (id.length !== 24) {
      return res.status(400).json({
        status: false,
        message: "Invalid id",
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }

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
