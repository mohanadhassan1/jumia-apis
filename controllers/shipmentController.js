const fs = require("fs");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ShipmentModel = require("../models/shipmentModel");

// ================================================== GET ==================================================
const getShipment = asyncHandler(async (req, res, next) => {
  let allShipments = await ShipmentModel.find({}, "status");
  res.status(200).json({ message: "Success", data: allShipments });
});

// ================================================== GET By ID ==================================================
const getShipmentById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let shipmentById = await ShipmentModel.findOne({ _id: id });
  if (!shipmentById) {
    return res.status(400).json("No Shipment with that ID");
  }
  res.status(200).json({ message: "Success", data: shipmentById });
});

// ================================================== POST ==================================================
const postShipment = asyncHandler(async (req, res, next) => {
  let addShipment = req.body;

  try {
    // let newShipment = await ShipmentModel.create({order_id:req.id, status:addShipment.status, estimated_delivery_date:addShipment.estimated_delivery_date});
    let newShipment = await ShipmentModel.create(addShipment);
    res.status(200).json({ message: "Success", data: newShipment });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== PATCH ==================================================
const patchShipment = asyncHandler(async (req, res, next) => {
  let updateShipment = req.body;
  let { id } = req.params;

  try {
    const updatedShipment = await ShipmentModel.findByIdAndUpdate(
      { _id: id },
      updateShipment
    );
    res.status(200).json({ message: "Success", data: updatedShipment });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== DELETE ==================================================
const deleteShipment = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  try {
    const deletedShipment = await ShipmentModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Success", data: deletedShipment });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { getShipment, getShipmentById, postShipment, patchShipment, deleteShipment };
