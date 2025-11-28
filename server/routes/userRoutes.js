import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    addAddress,
    addToWishlist,
    removeFromWishlist,
    getAllUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/', protect, admin, getAllUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.post('/address', protect, addAddress);
router
    .route('/wishlist/:productId')
    .post(protect, addToWishlist)
    .delete(protect, removeFromWishlist);

export default router;
