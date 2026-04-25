const express = require("express");
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrdersByUser,
  getUserNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead
} = require("../controllers/orderController.js");
const{ protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Notification routes
router.get('/notifications',protect, getUserNotifications);
router.put('/notifications/read-all',protect, markAllNotificationsAsRead);
router.put('/notifications/:id/read',protect, markNotificationAsRead);

// user routes
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);

// admin routes
router.get("/", protect, authorize('admin'), getAllOrders); // all orders
router.get("/user/:userId", protect, authorize('admin'), getOrdersByUser); // specific user's orders

module.exports = router;