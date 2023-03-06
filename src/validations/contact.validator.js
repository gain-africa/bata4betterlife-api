const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().max(255).required().trim(),
  message: Joi.string().required().trim(),
  phoneNo: Joi.number().integer().required(),
  email: Joi.string()
    .max(255)
    .required()
    .trim()
    .email({ minDomainSegments: 2 }),
});

async function addContactValidationMW(req, res, next) {
  const contactPayLoad = req.body;

  try {
    await contactAddSchema.validateAsync(contactPayLoad);
    next();
  } catch (err) {
    err.source = "add contact validation middleware";
    next(err.details[0].message);
  }
}

module.exports = {
  addContactValidationMW,
};
