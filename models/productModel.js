const mongoose = require("mongoose");
const joi = require("joi");
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity_in_stock: {
      type: Number,
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.Number,
      ref: "Category",
      required: true,
    },
    vendor_id: {
      type: mongoose.Schema.Types.Number,
      ref: "Vendor",
      required: true,
    },
    rating: {
      type: Number, // Assuming it's a numeric value representing the average rating
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: [{ type: String }], // Assuming image paths or URLs
  },
  { collection: "Product" }
);

// const validate = (product) => {
//   const schema = joi.object({
//     product_id: joi.number().min(1).max(5).required(),
//   });
//   return schema.validate(product);
// };

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product,
  // validate
};
