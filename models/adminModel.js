const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = mongoose.Schema(
  {
    admin_id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      minLength: [8, "user name at least 8 characters"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: [15, "maximum length 15 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: [15, "maximum length 15 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
  },
  { collection: "Admin" },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  // next for save user and continue
  next();
});

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
