const express = require("express");
const {
  register,
  logIn,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/", register);
router.post("/login", logIn);
router.patch("/:admin_id", updateAdmin);
router.delete("/:admin_id", deleteAdmin);

module.exports = router;
