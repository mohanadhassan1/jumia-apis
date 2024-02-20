const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
require("dotenv").config();
const asyncHandler = require("express-async-handler");

// #####################admin ##############################

const register = asyncHandler(async (req, res, next) => {
  let admin = req.body;
  try {
    let newAdmin = await adminModel.create(admin);
    res.status(201).json({ data: newAdmin });
  } catch (err) {
    res.status(500).json(err);
  }
});

const logIn = asyncHandler(async (req, res, next) => {
  // let { admin_id } = req.params;
  let { password, username } = req.body;
  if (!password || !username) {
    return res
      .status(400)
      .json({ message: "you must enter valid userName and password" });
  }
  let admin = await adminModel.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  let isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  let token = jwt.sign(
    {
      username: admin.username,
    },
    process.env.JWT_SECRET,

    { expiresIn: "2h" }
  );
  res.status(200).json({ token });
});

const updateAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { admin_id } = req.params;
    const { firstName, lastName, username, password, email } = req.body;

    const updatedAdmin = await adminModel.findOneAndUpdate(
      { admin_id },
      { $set: { firstName, lastName, username, password, email } },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: "admin not found" });
    }
    const response_data = {
      admin_id,
      firstName: updatedAdmin.firstName,
      lastName: updatedAdmin.lastName,
      email: updatedAdmin.email,
      username: updatedAdmin.username,
      password: updatedAdmin.password,
    };

    return res.json(response_data);
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { admin_id } = req.params;

    const deletedAdmin = await adminModel.findOneAndDelete({
      admin_id,
    });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "admin not found" });
    }

    const response_data = {
      admin_id,
      username: deletedAdmin.username,
    };

    return res.json({
      message: "admin deleted successfully",
      deletedAdmin: response_data,
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  register,
  logIn,
  updateAdmin,
  deleteAdmin,
};
