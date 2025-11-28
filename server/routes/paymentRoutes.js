import express from 'express';
import {
    createPaymentIntent,
    verifyPayment,
    paymentWebhook,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-intent', protect, createPaymentIntent);
router.post('/verify', protect, verifyPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), paymentWebhook);

export default router;
