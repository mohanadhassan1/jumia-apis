const { Subcategory } = require("../models/subcategoryModel");
const asyncHandler = require("express-async-handler");

//create
const createSubCategory = asyncHandler(async (req, res) => {
  const newSubCategory = req.body;
  const subcategoryCount = await Subcategory.countDocuments();
  newSubCategory.subcategory_id = subcategoryCount + 1;

  const createdSubCategory = await Subcategory.create(newSubCategory);
  res.status(201).json(createdSubCategory);
});

//reurn all subcategory
const getAllSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await Subcategory.find();
  res.json(subCategory);
});

//update by id
const updateCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const subcategory = await Subcategory.findOne({ subcategory_id: id });

  if (!subcategory) {
    return res.json({ error: "Subcategory not found" });
  }

  const updatedSubcategory = await Subcategory.findOneAndUpdate(
    { subcategory_id: id },
    updates,
    { new: true }
  );

  res.json(updatedSubcategory);
});

//get all
const getSubCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const foundSubCategory = await Subcategory.findOne({ subcategory_id: id });
  if (!foundSubCategory) {
    return res.status(400).json("No SubCategory with that ID");
  }

  res.status(200).json(foundSubCategory).populate({ path: "category_id" });
});

//del by id
const deleteSubCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedSubCategory = await Subcategory.findOneAndDelete({
    subcategory_id: id,
  });

  if (!deletedSubCategory) {
    return res.status(404).json({ error: "Subcategory not found" });
  }

  res.status(200).json({ message: "Subcategory deleted successfully" });
});

module.exports = {
  createSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  updateCategoryById,
};
