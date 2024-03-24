const { Subcategory } = require("../models/subcategoryModel");
const asyncHandler = require("express-async-handler");

//create
const createSubCategory = asyncHandler(async (req, res) => {
  const newSubCategory = req.body;

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

  const subcategory = await Subcategory.findById(id);

  if (!subcategory) {
    return res.json({ error: "Subcategory not found" });
  }

  const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, updates, {
    new: true,
  });

  res.json(updatedSubcategory);
});

//get by id
const getSubCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const foundSubCategory = await Subcategory.findById(id).populate(
    "category_id"
  );
  if (!foundSubCategory) {
    return res.status(400).json("No SubCategory with that ID");
  }

  res.status(200).json(foundSubCategory);
});

//del by id
const deleteSubCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedSubCategory = await Subcategory.findByIdAndDelete(id);

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
