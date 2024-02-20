const mongoose = require("mongoose");

const FeaturedProducts = mongoose.Schema({
    featured_id: {
    type: "number",
    required: true,
    unique: true
  },
  product_id: {
    type: "number",
    required: true,
    unique: true
  },
  start_date: {
    type:Date,
    required: true
  },
 
  end_date:{
    type:Date,
    required: true

},


    
 
});





const collectionName = 'FeaturedProducts';

const FeaturedProductsModle = mongoose.model("FeaturedProducts", FeaturedProducts,collectionName);
module.exports = FeaturedProductsModle;
