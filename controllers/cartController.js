const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CartModel = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

// ######## Add to cart

// Create a new item in the cart
const addToCart = asyncHandler(async (req, res) => {
  try {
    const { cart_id, customer_id, product_id, quantity } = req.body;
    const stringCustomerId = String(customer_id);
    const stringProductId = String(product_id);

    const existingCart = await CartModel.findOne({ cart_id });

    if (existingCart) {
      // If the cart already exists, update the existing cart
      existingCart.items.push({ product_id, quantity });
      await existingCart.save();
      return res.status(200).json({
        message: "Product added to cart successfully",
        cart: existingCart,
      });
    } else {
      // If the cart doesn't exist, create a new cart
      const newCart = await CartModel.create({
        cart_id,
        customer_id,
        items: [{ product_id, quantity }],
      });
      return res.status(201).json({
        message: "Cart created and product added successfully",
        cart: newCart,
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  try {
    const { cart_id } = req.params;
    const cart = await CartModel.findOne({ cart_id });
    const cartitems = cart.items;
    return res.status(200).json({ cartitems });
  } catch (error) {
    console.error("Error getting cart items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update quantity of a cart item
const updateCartItem = asyncHandler(async (req, res) => {
  try {
    const { cart_id, product_id, quantity } = req.body;
    let new_quantity = req.body.quantity;

    const cart = await CartModel.findOne({ cart_id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id === product_id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = new_quantity;
    await cart.save();
    return res
      .status(200)
      .json({ message: "Cart item updated successfully", cart: cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove cart item
const deleteCartItem = asyncHandler(async (req, res) => {
  try {
    const { cart_id, product_id } = req.params;

    const cart = await CartModel.findOne({ cart_id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (item) => item.product_id.toString() === product_id
    );
    cart.items.splice(index, 1);
    await cart.save();

    return res
      .status(200)
      .json({ message: "Cart item deleted successfully", cart: cart });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
