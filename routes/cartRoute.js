const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/:cart_id", getCartItems);
router.patch("/update", updateCartItem);
router.delete("/:cart_id/:product_id", deleteCartItem);

module.exports = router;
