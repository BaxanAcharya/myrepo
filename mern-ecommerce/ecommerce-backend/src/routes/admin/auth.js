const express = require("express");
const { authenticatedUserMiddleware } = require("../../common-middleware");
const router = express.Router();
const { signUp, signIn, signOut } = require("../../controllers/admin/auth");
const {
  validateSignup,
  validateSignIn,
  isValidated,
} = require("../../validators/auth");

router.post("/admin/signin", validateSignIn, isValidated, signIn);
router.post("/admin/signup", validateSignup, isValidated, signUp);
router.post("/admin/signout", signOut);

module.exports = router;
