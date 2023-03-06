const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler } = require("./middlewares/errorHandler");
const { limiter } = require("./middlewares/limiter");

// routes
const mail = require("./routes/mail.routes");
const contact = require("./routes/contact.routes");
const volunteer = require("./routes/volunteer.routes");

const app = express();

// use cors
app.use(cors());

// parse information from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middelewares
app.use(helmet());
app.use(limiter);

app.use("/api/v1/send-email", mail);
app.use("/api/v0/contact", contact);
app.use("/api/v0/volunteer", volunteer);

// Home Route
app.get("/", (req, res) => {
  return res.status(200).send({
    status: true,
    message: "Welcome",
  });
});

// Undefined route
app.get("*", (req, res) => {
  return res.status(404).send({
    status: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

module.exports = app;
