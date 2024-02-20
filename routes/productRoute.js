const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProductById)
  .patch(updateProductById);

module.exports = router;
