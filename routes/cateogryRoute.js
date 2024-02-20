const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/cateogryController");

router.post("/", addCategory);

router.get("/", getAllCategories);

router.get("/:category_id", getCategoryById);

router.patch("/:category_id", updateCategory);

router.delete("/:category_id", deleteCategory);

module.exports = router;
