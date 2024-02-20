const express = require("express");
const router = express.Router();
const {
  createVendor,
  getAllVendors,
  getVendorById,
  deleteVendorById,
  updateVendorById,
  loginVendor,
} = require("../controllers/vendorsController");
const {
  adminMiddleware,
  vendorMiddleware,
  authMiddleware,
} = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(authMiddleware, vendorMiddleware, getAllVendors)
  .post(createVendor);
router.route("/login").post(loginVendor);
router
  .route("/:id")
  .get(getVendorById)
  .delete(deleteVendorById)
  .patch(updateVendorById);

module.exports = router;
