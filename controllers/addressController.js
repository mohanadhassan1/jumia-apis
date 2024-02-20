const bcrypt = require("bcryptjs");
const addressModel = require("../models/addressModel");
const asyncHandler = require("express-async-handler");

// Create a new address
const addAddress = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { address_id, region, city, street, building } = req.body;

    if (!address_id || !region || !city || !street || !building) {
      return res.status(400).json({ error: "Invalid address data" });
    }

    const newAddress = await addressModel.create({
      address_id,
      region,
      city,
      street,
      building,
    });

    return res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all addresses
const getAllAddresses = asyncHandler(async (req, res) => {
  try {
    const addresses = await addressModel.find();

    return res.json({ addresses });
  } catch (error) {
    console.error("Error getting addresses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get address by ID
const getAddressById = asyncHandler(async (req, res) => {
  try {
    const { address_id } = req.params;

    const address = await addressModel.findOne({ address_id });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.json({ address });
  } catch (error) {
    console.error("Error getting address by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update address by ID
const updateAddressById = asyncHandler(async (req, res) => {
  try {
    const { address_id } = req.params;
    const { region, city, street, building } = req.body;

    if (!region || !city || !street || !building) {
      return res.status(400).json({ error: "Invalid address data" });
    }

    const updatedAddress = await addressModel.findOneAndUpdate(
      { address_id },
      { $set: { region, city, street, building } },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete address by ID
const deleteAddressById = asyncHandler(async (req, res) => {
  try {
    const { address_id } = req.params;

    const deletedAddress = await addressModel.findOneAndDelete({ address_id });

    if (!deletedAddress) {
      return res.status(404).json({ error: "Address not found" });
    }

    return res.json({
      message: "Address deleted successfully",
      address: deletedAddress,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  addAddress,
  getAllAddresses,
  getAddressById,
  updateAddressById,
  deleteAddressById,
};
