const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // find product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    // check if item exists
    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (item) {
      item.quantity += quantity; // increase quantity
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price, // store price snapshot
      });
    }

    // calculate total
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user cart
exports.getCart = async (req, res) => {
  try {
    // fetch cart with products
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // find cart
    const cart = await Cart.findOne({ user: req.user.id });

    // filter out item
    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    // recalculate total
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    await cart.save();

    res.json({
      success:true,
      data:cart,
      message: 'Removed from cart successfully'

    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};