const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");

const {
  validateSignup,
  isValidated,
  validateSignIn,
} = require("../validators/auth");

router.post("/signin", validateSignIn, isValidated, signIn);
router.post("/signup", validateSignup, isValidated, signUp);

module.exports = router;
