const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  getSubCategoryById,
  updateCategoryById,
} = require("../controllers/subcategoryController");

router.route("/").post(createSubCategory).get(getAllSubCategory);

router
  .route("/:id")
  .delete(deleteSubCategory)
  .get(getSubCategoryById)
  .patch(updateCategoryById);

module.exports = router;
