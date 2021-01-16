const { check, validationResult } = require("express-validator");
exports.validateSignup = [
  check("firstName").notEmpty().withMessage("Firstname is required...!!!"),
  check("lastName").notEmpty().withMessage("Lastname  is required...!!!"),
  check("email").isEmail().withMessage("Invalid email format...!!!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long...!!!"),
];

exports.isValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    console.log(errors.array()[0].msg);
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  next();
};

exports.validateSignIn = [
  check("email").isEmail().withMessage("Invalid email format...!!!"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long...!!!"),
];
