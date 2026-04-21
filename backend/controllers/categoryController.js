const Category = require("../models/Category");

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json({
      success: true,
      data:category,
      message:"categories created successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      data:categories,
      message:"categories fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ ONE
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!category) return res.status(404).json({ message: "Not found" });

    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};