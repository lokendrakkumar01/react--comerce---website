import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import api from '../api/axios';
import { toast } from 'react-toastify';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
        phone: '',
    });

    const subtotal = items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + tax + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // Create payment intent
            const { data } = await api.post('/payment/create-intent', {
                amount: total,
            });

            // Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                toast.error(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                // Create order
                await api.post('/orders', {
                    items: items.map((item) => ({
                        product: item.product._id,
                        name: item.product.name,
                        image: item.product.images?.[0]?.url,
                        quantity: item.quantity,
                        price: item.product.price,
                        color: item.color,
                        size: item.size,
                    })),
                    shippingAddress: formData,
                    paymentMethod: 'card',
                    itemsPrice: subtotal,
                    taxPrice: tax,
                    shippingPrice: shipping,
                    totalPrice: total,
                });

                toast.success('Order placed successfully!');
                navigate('/orders');
            }
        } catch (error) {
            toast.error('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Street Address"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="ZIP Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                <div className="card p-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={!stripe}
                className="w-full"
            >
                Place Order - ₹{total.toLocaleString()}
            </Button>
        </form>
    );
};

const Checkout = () => {
    const { items } = useSelector((state) => state.cart);

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </motion.div>
    );
};

export default Checkout;
