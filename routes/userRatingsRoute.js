const express = require("express");
const router = express.Router();
const {
  createUserRating,
  getAllUserRatings,
  getUserRatingById,
  deleteUserRatingById,
  updateUserRatingById,
} = require("../controllers/userRatingsController");

router.route("/").get(getAllUserRatings).post(createUserRating);

router
  .route("/:id")
  .get(getUserRatingById)
  .delete(deleteUserRatingById)
  .patch(updateUserRatingById);

module.exports = router;
