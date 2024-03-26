// vendorModel.js
const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_person: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    address: {
      type: String,
      
    },
    role: {
      type: String,
      default: "vendor",
    },
  },
  { collection: "Vendor" }
);

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bycrpt.genSalt(10);
  this.password = await bycrpt.hash(this.password, salt);
});

vendorSchema.methods.matchPassword = async function (enterdPassword) {
  return await bycrpt.compare(enterdPassword, this.password);
};

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = { Vendor };
