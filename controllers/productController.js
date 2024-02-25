const { Product } = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  const newProduct = req.body;
 

 

  const createdProduct = await Product.create(newProduct);

  res.status(201).json(createdProduct);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const foundProduct = await Product.findOne({ product_id: id });

  if (!foundProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(foundProduct);
});

const updateProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const product = await Product.findOne({ product_id: id });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { product_id: id },
    updates,
    { new: true }
  );

  res.json(updatedProduct);
});

const deleteProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedProduct = await Product.findOneAndDelete({
    product_id: id,
  });

  if (!deletedProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
