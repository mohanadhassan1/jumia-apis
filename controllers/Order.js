const OrderModle = require("../models/Order");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res, next) => {
  try {
    let findOrders = await OrderModle.find();
    res.status(200).json({ deta: findOrders });
  } catch (err) {
    res.status(400).json(err);
  }
});

const getByOrderID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    let Order = await OrderModle.findOne({ order_id: id });
    if (Order) {
      res.status(200).json(Order);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const AddOrder = asyncHandler(async (req, res, next) => {
  let Deta = req.body;
  try {
    let newOrder = await OrderModle.create(Deta);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json(e);
  }
});

const EditOrder = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  try {
    let Order = await OrderModle.updateOne({ order_id: id }, body);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const deleteOrder = asyncHandler(async (req, res, next) => {
  const Id = req.params.id;
  try {
    const Order = await OrderModle.findOneAndDelete({ order_id: Id });
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { getOrders, AddOrder, EditOrder, getByOrderID, deleteOrder };
