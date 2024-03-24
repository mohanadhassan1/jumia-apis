const categoryModel = require("../models/cateogryModel");
const CategoryModel = require("../models/cateogryModel");
const asyncHandler = require("express-async-handler");

const addCategory = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Invalid category data" });
    }

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(409)
        .json({ error: "Category with this name already exists" });
    }

    await CategoryModel.create({ name, description });

    return res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    const response_data = categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));

    return res
      .status(200)
      .json({ message: "All categories", data: response_data });
  } catch (error) {
    console.error("Error getting categories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const category = await CategoryModel.findOne({ category_id:id });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const response_data = {
      id: category.id,
      name: category.name,
      description: category.description,
    };

    return res.status(200).json(response_data);
  } catch (error) {
    console.error("Error getting category by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { category_id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Invalid category data" });
    }

    const updatedCategory = await categoryModel.findOneAndUpdate(
      { category_id },
      { $set: { name, description } },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    const response_data = {
      category_id,
      name: updatedCategory.name,
      description: updatedCategory.description,
    };

    return res.json(response_data);
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { category_id } = req.params;

    const deletedCategory = await categoryModel.findOneAndDelete({
      category_id,
    });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const response_data = {
      category_id,
      name: deletedCategory.name,
      description: deletedCategory.description,
    };

    return res.json({
      message: "Category deleted successfully",
      deletedCategory: response_data,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
