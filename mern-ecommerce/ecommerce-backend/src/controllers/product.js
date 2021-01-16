const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;

  try {
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const product = new Product({
      name,
      slug: slugify(name),
      price,
      quantity,
      description,
      productPictures,
      category,
      createdBy: req.user._id,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully ...!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
