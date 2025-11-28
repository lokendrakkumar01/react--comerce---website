import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'ShopHub E-Commerce API',
        developer: 'Lokendrakumar',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            products: '/api/products',
            users: '/api/users',
            cart: '/api/cart',
            orders: '/api/orders',
            payment: '/api/payment',
        },
        documentation: 'https://github.com/lokendrakumar',
        socialMedia: {
            linkedin: 'https://linkedin.com/in/lokendrakumar13',
            twitter: 'https://x.com/LokendraKu39266',
            instagram: 'https://www.instagram.com/loke_ndrakumar123',
            youtube: 'http://www.youtube.com/@uaacademy9629',
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'API is running...' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
