import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addToCart({
                productId: product._id,
                quantity: 1,
                color: product.colors?.[0] || '',
                size: product.sizes?.[0] || '',
            })).unwrap();
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error || 'Failed to add to cart');
        }
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Link to={`/products/${product._id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="card group relative overflow-hidden cursor-pointer h-full"
            >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                        src={product.images?.[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {discountPercentage}% OFF
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-dark-card/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaHeart className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors" />
                    </button>

                    {/* Quick Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 btn btn-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                    >
                        <FaShoppingCart className="inline mr-2" />
                        Add to Cart
                    </button>
                </div>

                {/* Product Info */}
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                        <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            ({product.numReviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary-500">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {product.stock < 10 && product.stock > 0 && (
                        <p className="text-xs text-orange-600 mt-1">Only {product.stock} left!</p>
                    )}
                    {product.stock === 0 && (
                        <p className="text-xs text-red-600 mt-1">Out of Stock</p>
                    )}
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
