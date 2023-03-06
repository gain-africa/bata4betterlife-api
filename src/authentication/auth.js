const { SECRET } = require("../config/config");

const authenticateUser = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(400).json({
        status: false,
        message: "No secret provided",
      });
    }

    req.secret = authorization.split(" ")[1];

    if (req.secret !== SECRET) {
      return res.status(401).json({
        status: false,
        message: "Invalid secret",
      });
    }

    next();
  } catch (err) {
    err.source = "authentication middleware error";
    next(err);
  }
};

module.exports = {
  authenticateUser,
};
