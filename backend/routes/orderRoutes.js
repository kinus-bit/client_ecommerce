const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrdersByUser,
} = require("../controllers/orderController.js");
const{ protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// user routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);

// admin routes
router.get("/", protect, authorize('admin'), getAllOrders); // all orders
router.get("/user/:userId", protect, authorize('admin'), getOrdersByUser); // specific user's orders

module.exports = router;