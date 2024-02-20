const FeaturedModle = require("../models/FeaturedProducts");
const asyncHandler = require("express-async-handler");

const getFeatureds = asyncHandler(async (req, res, next) => {
  try {
    let findFeatureds = await FeaturedModle.find();
    res.status(200).json({ deta: findFeatureds });
  } catch (err) {
    res.status(400).json(err);
  }
});

const getByFeaturedID = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  try {
    let Featured = await FeaturedModle.findOne({ featured_id: id });
    if (Featured) {
      res.status(200).json(Featured);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const AddFeatured = asyncHandler(async (req, res, next) => {
  let Deta = req.body;
  try {
    let newFeatured = await FeaturedModle.create(Deta);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json(e);
  }
});

const EditFeatured = asyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  try {
    let Featured = await FeaturedModle.updateOne({ featured_id: id }, body);
    res.status(200).json({ Done: true });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

const deleteFeatured = asyncHandler(async (req, res, next) => {
  const Id = req.params.id;
  try {
    const Featured = await FeaturedModle.findOneAndDelete({ featured_id: Id });
    res.status(200).json(Featured);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  getFeatureds,
  AddFeatured,
  EditFeatured,
  getByFeaturedID,
  deleteFeatured,
};
