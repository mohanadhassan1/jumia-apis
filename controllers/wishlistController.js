const { Wishlist } = require("../models/wishlistModel");
const asyncHandler = require("express-async-handler");

const createWishlist = asyncHandler(async (req, res) => {
  try {
    const newWishlist = req.body;
    const wishlistCount = await Wishlist.countDocuments();

    newWishlist.wishlist_id = wishlistCount + 1;

    const createdWishlist = await Wishlist.create(newWishlist);

    res.status(201).json(createdWishlist);
  } catch (error) {
    console.error("Error creating wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllWishlists = asyncHandler(async (req, res) => {
  try {
    const wishlists = await Wishlist.find();

    res.json(wishlists);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const updateWishlistById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const wishlist = await Wishlist.findOne({ wishlist_id: id });

    if (!wishlist) {
      return res.json({ error: "Wishlist not found" });
    }

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { wishlist_id: id },
      updates,
      { new: true }
    );

    res.json(updatedWishlist);
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getWishlistById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const foundWishlist = await Wishlist.findOne({ wishlist_id: id });
    if (!foundWishlist) {
      return res.status(400).json("No Wishlist with that ID");
    }
    res.status(200).json(foundWishlist);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteWishlistById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const deletedWishlist = await Wishlist.findOneAndDelete({
      wishlist_id: id,
    });

    if (!deletedWishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  createWishlist,
  getAllWishlists,
  updateWishlistById,
  getWishlistById,
  deleteWishlistById,
};
