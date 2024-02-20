const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    order_id: {
    type: "number",
    required: true,
    unique: true
  },
  customer_id: {
    type: "number",
    required: true,
  },
  products: {
    type: [Object],
  },
 
  order_date:{
    type:Date,

},
total_amount:{
    type: "number",

},
payment_id: {
    type: "number",
    required: true,
  },
  shipment_id: {
    type: "number",
    required: true,
  },

    
 
});





const collectionName = 'Order';

const OrderModle = mongoose.model("Order", OrderSchema,collectionName);
module.exports = OrderModle;
