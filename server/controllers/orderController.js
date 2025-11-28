import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Coupon codes (in production, this would be in database)
const coupons = {
    WELCOME10: { discount: 10, type: 'percentage' },
    SAVE20: { discount: 20, type: 'percentage' },
    FLAT100: { discount: 100, type: 'fixed' },
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            couponCode,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        let discount = 0;
        if (couponCode && coupons[couponCode]) {
            const coupon = coupons[couponCode];
            if (coupon.type === 'percentage') {
                discount = (itemsPrice * coupon.discount) / 100;
            } else {
                discount = coupon.discount;
            }
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice: totalPrice - discount,
            discount,
            couponCode,
        });

        // Decrease product stock
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        // Clear user cart
        const user = await User.findById(req.user._id);
        user.cart = [];
        await user.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (order) {
            // Check if order belongs to user or user is admin
            if (
                order.user._id.toString() === req.user._id.toString() ||
                req.user.role === 'admin'
            ) {
                res.json(order);
            } else {
                res.status(401).json({ message: 'Not authorized' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                updateTime: req.body.update_time,
                emailAddress: req.body.payer?.email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status;

            if (req.body.status === 'delivered') {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Validate coupon
// @route   POST /api/orders/validate-coupon
// @access  Public
export const validateCoupon = async (req, res) => {
    try {
        const { code, itemsPrice } = req.body;

        if (coupons[code]) {
            const coupon = coupons[code];
            let discount = 0;

            if (coupon.type === 'percentage') {
                discount = (itemsPrice * coupon.discount) / 100;
            } else {
                discount = coupon.discount;
            }

            res.json({
                valid: true,
                discount,
                message: `Coupon applied! You saved ₹${discount}`,
            });
        } else {
            res.status(400).json({
                valid: false,
                discount: 0,
                message: 'Invalid coupon code',
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
