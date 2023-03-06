// access the values in the .env file

require("dotenv").config();

const PORT = process.env.PORT;
const USER = process.env.USER;
const PASS = process.env.PASS;
const MONGODB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL;

module.exports = {
  PORT,
  MONGODB_URL,
  PASS,
  USER,
};
