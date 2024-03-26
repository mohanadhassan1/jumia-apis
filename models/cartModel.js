const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    customer_id: {
      //  type: mongoose.Schema.Types.ObjectId,
      type:Number,
      ref: "customer",
      required: true,
    },
    items: [
      {
        _id: {
          // type: mongoose.Schema.Types.ObjectId,
          type:Number,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required:true
        },
      },
    ],
  },
  { collection: "Cart", timestamps: true }
);

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
