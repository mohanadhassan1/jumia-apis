const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

// Utility function to handle asynchronous functions and catch errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Authentication middleware
const authMiddleware = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "You have to login first" });
  }

  try {
    const decoded = await promisify(jwt.verify)(
      authorization,
      process.env.JWT_SECRET
    );

    req.id = decoded.id;
    req.role = decoded.role;

    // res.json(req.role);
    next();
  } catch (err) {
    res.status(401).json({ message: "You aren't authenticated." });
  }
});

// Role-based middleware
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Permission denied." });
    }
    next();
  };
};

// Admin role middleware
const adminMiddleware = roleMiddleware(["admin"]);

// Customer role middleware
const customerMiddleware = roleMiddleware(["customer"]);

// Vendor role middleware
const vendorMiddleware = roleMiddleware(["vendor"]);

module.exports = {
  authMiddleware,
  adminMiddleware,
  customerMiddleware,
  vendorMiddleware,
  asyncHandler,
};
