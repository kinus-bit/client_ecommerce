const Order = require("../models/Order.js");
const Cart = require("../models/Cart.js");
const User = require("../models/User.js");
const { sendEmail} = require("../config/mailer.js");
const { orderConfirmationEmail, adminOrderNotificationEmail } = require("../utils/emailTemplates.js");
const Notification = require("../models/Notification.js");

//Helper function to create notification
const createNotification = async (recipientId, type, title, message, data = {}) => {
    try {
        const notification = await Notification.create({
            recipient: recipientId,
            type,
            title,
            message,
            data
        });
        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
};

//Helper function to send order notification emails
const sendOrderNotifications = async (order, user) => {
    try {
        // Send email to user
        const userEmailHtml = orderConfirmationEmail(user.name, order);
        await sendEmail({
            email: user.email,
            subject: `Order Confirmation - ${order.orderNumber}`,
            html: userEmailHtml
        });

        // Send email to admin
        const admins = await User.find({ role: 'admin' });
        const adminEmailHtml = adminOrderNotificationEmail(order, user);
        
        for (const admin of admins) {
            await sendEmail({
                email: admin.email,
                subject: `New Order Received - ${order._id}`,
                html: adminEmailHtml
            });
        }

        return true;
    } catch (error) {
        console.error('Error sending order notifications:', error);
        return false;
    }
};
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
    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount: cart.totalPrice,
      shippingAddress,
      contact,
    });


    // clear cart after order
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    //populate order with product details
    const populatedOrder = await Order.findById(order._id)
    .populate('user' , 'name email')
    .populate('items.product' , 'name price');

    const user = await User.findById(req.user.id);

    //create notification for user
    await createNotification(
            req.user.id,
            'order_placed',
            'Order Placed Successfully',
            `Your order #${populatedOrder._id} has been placed successfully. Total: $${populatedOrder.totalAmount.toFixed(2)}`,
            {orderId:order._id}
    );
    
    //create notification for all admins
    const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            await createNotification(
                admin._id,
                'order_placed',
                'New Order Received',
                `New order #${populatedOrder._id} from ${user.name}. Total: $${populatedOrder.totalAmount.toFixed(2)}`,
                { 
                    orderId: order._id, 
                    userId: user._id,
                    userName: user.name
                }
            );
        }

    //send email notifications
    await sendOrderNotifications(populatedOrder, user);

    res.status(201).json({ 
      success: true,
      order,
      message: 'order placed successfully' });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message });
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

    res.json({ 
      success: true,
      orders
     });
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

//get user notifications
exports.getUserNotifications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const startIndex = (page - 1) * limit;

        const query = { recipient: req.user.id };
        
        if (req.query.unread === 'true') {
            query.isRead = false;
        }

        const total = await Notification.countDocuments(query);
        const notifications = await Notification.find(query)
            .sort('-createdAt')
            .limit(limit)
            .skip(startIndex);

        res.status(200).json({
            success: true,
            data: notifications,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
                unreadCount: await Notification.countDocuments({ recipient: req.user.id, isRead: false })
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

//mark notification as read
exports.markNotificationAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        if (notification.recipient.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

//mark all notifications as read
exports.markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, isRead: false },
            { isRead: true }
        );

        res.status(200).json({
            success: true,
            message: 'All notifications marked as read'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

