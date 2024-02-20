// wishlistModel.js
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    wishlist_id: {
      type: Number,
      required: true,
      unique: true,
    },
    customer_id: {
      type: Number, // Assuming user_id is a string, adjust accordingly
      required: true,
    },
    products: [
      {
        product_id: {
          type: Number,
          required: true,
        },
      },
    ],
    // You can add more fields specific to your wishlist model
  },
  { collection: "Wishlist" }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Wishlist };
