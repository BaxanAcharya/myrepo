const express = require("express");

const {
  authenticatedUserMiddleware,
  adminMiddleWare,
} = require("../common-middleware");
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const router = express.Router();
const { createCategory, findAllCategory } = require("../controllers/category");

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
  "/category",
  authenticatedUserMiddleware,
  adminMiddleWare,
  upload.single("categoryPicture"),
  createCategory
);
router.get("/category", findAllCategory);

module.exports = router;
