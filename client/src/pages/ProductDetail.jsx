import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaTruck, FaCheckCircle } from 'react-icons/fa';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading } = useSelector((state) => state.products);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors?.[0] || '');
            setSelectedSize(product.sizes?.[0] || '');
        }
    }, [product]);

    const handleAddToCart = async () => {
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity,
                color: selectedColor,
                size: selectedSize,
            })).unwrap();
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error || 'Failed to add to cart');
        }
    };

    if (loading || !product) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <div>
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4"
                    >
                        <img
                            src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-4">
                        {product.images?.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index
                                        ? 'border-primary-500'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <img src={image.url} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                {product.rating} ({product.numReviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl font-bold text-primary-500">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Color</h3>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-lg border-2 ${selectedColor === color
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-3">Size</h3>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border-2 ${selectedSize === size
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                : 'border-gray-300 dark:border-gray-600'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity */}
                    <div>
                        <h3 className="font-semibold mb-3">Quantity</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        {product.stock > 0 ? (
                            <>
                                <FaCheckCircle className="text-green-500" />
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                    In Stock ({product.stock} available)
                                </span>
                            </>
                        ) : (
                            <span className="text-red-600 dark:text-red-400 font-semibold">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <Button
                            onClick={handleAddToCart}
                            variant="primary"
                            className="w-full"
                            disabled={product.stock === 0}
                        >
                            <FaShoppingCart className="inline mr-2" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" className="w-full">
                            Buy Now
                        </Button>
                    </div>

                    {/* Features */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-3">
                        <div className="flex items-center gap-3">
                            <FaTruck className="text-primary-500" />
                            <span>Free delivery on orders above ₹999</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCheckCircle className="text-green-500" />
                            <span>7-day easy return & exchange</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Reviews */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((review) => (
                            <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold">{review.user?.name}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
            </div>
        </motion.div>
    );
};

export default ProductDetail;
