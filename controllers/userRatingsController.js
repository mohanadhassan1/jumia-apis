const { Rating } = require("../models/userRatingsModel");
const asyncHandler = require("express-async-handler");

const createUserRating = asyncHandler(async (req, res) => {
  const newRating = req.body;
  const ratingCount = await Rating.countDocuments();

  newRating.rating_id = ratingCount + 1;
  const createdRating = await Rating.create(newRating);

  res.status(201).json(createdRating);
});

const getAllUserRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find();
  res.json(ratings);
});

const updateUserRatingById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const rating = await Rating.findOne({ rating_id: id });

  if (!rating) {
    return res.json({ error: "Rating not found" });
  }

  const updatedRating = await Rating.findOneAndUpdate(
    { rating_id: id },
    updates,
    { new: true }
  );

  res.json(updatedRating);
});

const getUserRatingById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const foundRating = await Rating.findOne({ rating_id: id });
    if (!foundRating) {
      return res.status(400).json("No Rating with that ID");
    }
    res.status(200).json(foundRating);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteUserRatingById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const deletedRating = await Rating.findOneAndDelete({
    rating_id: id,
  });

  if (!deletedRating) {
    return res.status(404).json({ error: "Rating not found" });
  }

  res.status(200).json({ message: "Rating deleted successfully" });
});

module.exports = {
  createUserRating,
  getAllUserRatings,
  getUserRatingById,
  deleteUserRatingById,
  updateUserRatingById,
};
