const fs = require("fs");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const RecommendationModel = require("../models/recommendationModel");

// ================================================== GET ==================================================
const getRecommendation = asyncHandler(async (req, res, next) => {
  let allRecommendations = await RecommendationModel.find({},"recommended_products");
  res.status(200).json({ message: "Success", data: allRecommendations });
});

// ================================================== GET By ID ==================================================
const getRecommendationById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let recommendationById = await RecommendationModel.findOne({ _id: id });
  if (!recommendationById) {
    return res.status(400).json("No Recommendation with that ID");
  }
  res.status(200).json({ message: "Success", data: recommendationById });
})

// ================================================== POST ==================================================
const postRecommendation = asyncHandler(async (req, res, next) => {
  let addRecommendation = req.body;

  try {
    let newRecommendation = await RecommendationModel.create(addRecommendation);
    res.status(200).json({ message: "Success", data: newRecommendation });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== PATCH ==================================================
const patchRecommendation = asyncHandler(async (req, res, next) => {
  let updateRecommendation = req.body;
  let { id } = req.params;

  try {
    const updatedRecommendation = await RecommendationModel.findByIdAndUpdate(
      { _id: id },
      updateRecommendation
    );
    res.status(200).json({ message: "Success", data: updatedRecommendation });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== DELETE ==================================================
const deleteRecommendation = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  try {
    const deletedRecommendation = await RecommendationModel.findByIdAndDelete({
      _id: id,
    });
    res.status(200).json({ message: "Success", data: deletedRecommendation });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  getRecommendation,
  getRecommendationById,
  postRecommendation,
  patchRecommendation,
  deleteRecommendation,
};
