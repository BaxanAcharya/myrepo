const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticatedUserMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: "Access denied no auth provided...!",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
  next();
};

const generateToken = (user) => {
  //jwt token
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h",
    }
  );

  return token;
};

const userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User Access Denied" });
  }
  next();
};

const adminMiddleWare = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin Access Denied" });
  }
  next();
};

module.exports = {
  generateToken,
  authenticatedUserMiddleware,
  adminMiddleWare,
  userMiddleware,
};
