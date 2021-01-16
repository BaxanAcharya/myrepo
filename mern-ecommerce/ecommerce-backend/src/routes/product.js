const express = require("express");

const {
  authenticatedUserMiddleware,
  adminMiddleWare,
} = require("../common-middleware");
const { createProduct } = require("../controllers/product");
const multer = require("multer");
const router = express.Router();
const shortId = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "_" + Date.now() + "_" + file.originalname);
  },
});
const fileFilter = (req, file, cb, res) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Images can only be uploaded!!!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });

router.post(
  "/product",
  authenticatedUserMiddleware,
  adminMiddleWare,
  upload.array("productPicture"),
  createProduct
);

module.exports = router;
