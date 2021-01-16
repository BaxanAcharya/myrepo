const express = require("express");

const {
  authenticatedUserMiddleware,
  userMiddleware,
} = require("../common-middleware");
const { addItemToCart } = require("../controllers/cart");

const router = express.Router();
// const { createCategory, findAllCategory } = require("../controllers/category");

router.post(
  "/cart",
  authenticatedUserMiddleware,
  userMiddleware,
  addItemToCart
);
// router.get("/cart", findAllCategory);

module.exports = router;
