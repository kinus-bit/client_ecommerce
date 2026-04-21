const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// CREATE
exports.createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // ensure category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategory = await Subcategory.create({ name, category });

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate("category");

    if (!subcategory) return res.status(404).json({ message: "Not found" });

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    // validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );

    if (!subcategory) return res.status(404).json({ message: "Not found" });

    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Subcategory deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};