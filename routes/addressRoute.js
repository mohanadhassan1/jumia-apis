const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAllAddresses,
  getAddressById,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/addressController");
const {
  adminMiddleware,
  customerMiddleware,
} = require("../middlewares/authMiddleware");

// const express = require('express');

router.post("/", addAddress);

router.get("/", getAllAddresses);

router.get("/:address_id", getAddressById);

router.patch("/:address_id", updateAddressById);

router.delete("/:address_id", deleteAddressById);

module.exports = router;
