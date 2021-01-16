const Category = require("../models/category");
const slugify = require("slugify");

const createCategories = (categories, parentId = null) => {
  const categoeyList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoeyList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      //recursive function
      children: createCategories(categories, cat._id),
    });
  }

  return categoeyList;
};
exports.createCategory = async (req, res) => {
  try {
    const categoryObject = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };

    if (req.file) {
      categoryObject.categoryImage = `${process.env.HOST_URL}/public/${req.file.filename}`;
    }

    if (req.body.parentId) {
      categoryObject.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObject);
    const _cat = await cat.save();
    res.status(201).json({
      message: _cat,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

exports.findAllCategory = async (req, res) => {
  try {
    var cat = await Category.find({});
    const categoryList = createCategories(cat);
    res.status(200).json({
      message: categoryList,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
