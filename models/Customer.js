const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const CustomerSchema = mongoose.Schema({
    customer_id: {
    type: "number",
    required: true,
    unique: true
  },
  first_name: {
    type: "string",
    required: true
  },
  last_name: {
    type: "string",
    required: true
  },
 
  email:{
    type: "string",
    required: true

},
password: {
  type: "string",
  required: true
},  
phone_number:{
    type: "number",

},
address_of_Id: {
type: [Number],
ref : 'addressModel'

},
role: {
  type:'string',
  enum:["Admin","Vendor","Customer"],
  default:"Customer",   
},

    
 
});


CustomerSchema.pre("save", function(next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});


const collectionName = 'Customer';

const CustomerModle = mongoose.model("Customer", CustomerSchema,collectionName);
module.exports = CustomerModle;
