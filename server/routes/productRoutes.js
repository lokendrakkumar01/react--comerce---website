import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    getTrendingProducts,
    createProductReview,
} from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/trending', getTrendingProducts);
router
    .route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);
router.post(
    '/:id/images',
    protect,
    admin,
    upload.array('images', 5),
    uploadProductImages
);
router.post('/:id/reviews', protect, createProductReview);

export default router;
