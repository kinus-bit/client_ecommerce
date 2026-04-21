const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");

// Create order from cart
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, contact } = req.body;

    // get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // map cart items to order items
    const items = cart.items.map((i) => ({
      product: i.product._id,
      name: i.product.name,
      price: i.price,
      quantity: i.quantity,
    }));

    // create order
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount: cart.totalPrice,
      shippingAddress,
      contact,
    });

    await order.save();

    // clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get logged-in user's orders
exports.getUserOrders = async (req, res) => {
  try {
    // fetch orders
    const orders = await Order.find({ user: req.user.id });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // fetch all orders with user info
    const orders = await Order.find().populate("user", "name email");

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get orders by specific user
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // find orders for this user
    const orders = await Order.find({ user: userId }).populate(
      "user",
      "name email"
    );

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};