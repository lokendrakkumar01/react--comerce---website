import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [dispatch, isAuthenticated]);

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await dispatch(updateCartItem({ itemId, quantity: newQuantity })).unwrap();
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const handleRemove = async (itemId) => {
        try {
            await dispatch(removeFromCart(itemId)).unwrap();
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const subtotal = items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + tax + shipping - discount;

    if (!isAuthenticated) {
        return (
            <div className="text-center py-20">
                <FaShoppingCart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <FaShoppingCart className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="card"
                        >
                            <div className="flex gap-6">
                                {/* Image */}
                                <img
                                    src={item.product?.images?.[0]?.url || '/placeholder.jpg'}
                                    alt={item.product?.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">{item.product?.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {item.color && `Color: ${item.color}`} {item.size && `| Size: ${item.size}`}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <FaMinus className="w-3 h-3" />
                                            </button>
                                            <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <FaPlus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                    <p className="text-xl font-bold text-primary-500">
                                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                                    </p>
                                    {item.product?.originalPrice && (
                                        <p className="text-sm text-gray-500 line-through">
                                            ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
                <div className="card sticky top-24">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                    {/* Coupon */}
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Coupon code"
                                className="input flex-1"
                            />
                            <Button variant="outline">Apply</Button>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (18%)</span>
                            <span>₹{tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{discount.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between text-xl font-bold mb-6">
                        <span>Total</span>
                        <span className="text-primary-500">₹{total.toLocaleString()}</span>
                    </div>

                    <Button
                        onClick={() => navigate('/checkout')}
                        variant="primary"
                        className="w-full"
                    >
                        Proceed to Checkout
                    </Button>

                    <Link
                        to="/products"
                        className="block text-center text-primary-500 hover:text-primary-600 mt-4"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
