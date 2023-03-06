const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Set up the nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Set up the email options
    const mailOptions = {
      from: process.env.USER,
      to: process.env.USER,
      subject: `Mail from ${name}`,
      html: `
            <h3 style="font-size: 16px;">Email: ${email}</h3>
            <p style="font-size: 20px;">${message}</p>
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ status: false, message: "Email not sent" });
        console.log(error);
      } else {
        res.json({ status: true, message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMail,
};
