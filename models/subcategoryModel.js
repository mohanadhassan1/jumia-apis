const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    subcategory_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category_id: {
      type: mongoose.Schema.Types.Number,
      required: true,
      ref: "Category",
    },
  },
  { collection: "Subcategory" }
);

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = { Subcategory };
