const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  coupon_id: {
    type: "number",
    required: true,
    unique: true
  },
  code: {
    type: "string",
    required: true
  },
  discount_percentage: {
    type: "number",
  },
 
  expiration_date:{
        type:Date
    }
 
});





const collectionName = 'Coupons';

const CouponsModle = mongoose.model("Coupons", couponSchema,collectionName);
module.exports = CouponsModle;
