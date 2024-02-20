const fs = require("fs");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ReviewModel = require("../models/reviewModel");

// ================================================== GET ==================================================
const getReview = asyncHandler(async (req, res, next) => {
  let allReviews = await ReviewModel.find({}, "rating");
  res.status(200).json({ message: "Success", data: allReviews });
});

// ================================================== GET By ID ==================================================
const getReviewById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let reviewById = await ReviewModel.findOne({ _id: id });
  if (!reviewById) {
    return res.status(400).json("No Review with that ID");
  }
  res.status(200).json({ message: "Success", data: reviewById });
});

// ================================================== POST ==================================================
const postReview = asyncHandler(async (req, res, next) => {
  let addReview = req.body;

  try {
    // let newReview = await ReviewModel.create({customer_id:req.id, product_id:req.id, rating:addReview.rating, comment:addReview.comment, data:addReview.data});
    let newReview = await ReviewModel.create(addReview);
    res.status(200).json({ message: "Success", data: newReview });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== PATCH ==================================================
const patchReview = asyncHandler(async (req, res, next) => {
  let updateReview = req.body;
  let { id } = req.params;

  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      { _id: id },
      updateReview
    );
    res.status(200).json({ message: "Success", data: updatedReview });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ================================================== DELETE ==================================================
const deleteReview = asyncHandler(async (req, res, next) => {
  let { id } = req.params;

  try {
    const deletedReview = await ReviewModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Success", data: deletedReview });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { getReview, getReviewById, postReview, patchReview, deleteReview };
