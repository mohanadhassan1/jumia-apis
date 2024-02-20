const express = require("express");
const router = express.Router();
const {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlistById,
  updateWishlistById,
} = require("../controllers/wishlistController");

router.route("/").get(getAllWishlists).post(createWishlist);

router
  .route("/:id")
  .get(getWishlistById)
  .delete(deleteWishlistById)
  .patch(updateWishlistById);

module.exports = router;
