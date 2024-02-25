const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { collection: "Subcategory" }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = { Subcategory };
