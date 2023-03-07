const nodemailer = require("nodemailer");
const { USER, PASS } = require("../config/config");
require("dotenv").config();

const sendContactMail = async (req, res, next) => {
  try {
    const { name, email, phoneNo, message } = req.body;

    // Set up the nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: USER,
      to: USER,
      subject: `Bata Contact Mail from ${name}`,
      html: `<div style="font-size: 20px;">
          <p>
            Hello, my name is ${name}. <br />I saw your works and I would like
            to get in contact with you. <br />
            My phone number is ${phoneNo}. <br />
            My email address is ${email}.
          </p>
          <p>
            Here is a message from me: <br />
            <span style="color: blue;">${message}</span>
          </p>
        </div>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ status: false, message: "Email not sent" });
        next(err);
      }
      next();
    });
  } catch (err) {
    err.source = "send contact mail service";
    next(err);
  }
};

const sendVolunteerMail = async (req, res, next) => {
  try {
    const { name, email, phoneNo, skills, interest } = req.body;

    // Set up the nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: USER,
      to: USER,
      subject: `Bata Volunteer Mail from ${name}`,
      html: `<div style="font-size: 20px;">
      <p>
        Hello, my name is ${name}. <br />I saw your works and I would like to join you and support your cause.<br />
        My phone number is ${phoneNo}. <br />
        My email address is ${email}. <br />
        I'm skilled in ${skills}. <br />
        I would like to be involved in the area of ${interest}. 
      </p>
    </div>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({ status: false, message: "Email not sent" });
        next(err);
      }
      next();
    });
  } catch (err) {
    err.source = "send volunteer mail service";
    next(err);
  }
};

module.exports = {
  sendContactMail,
  sendVolunteerMail,
};
