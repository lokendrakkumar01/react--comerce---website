import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { FaShoppingCart, FaUser, FaSearch, FaMoon, FaSun, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const { mode } = useSelector((state) => state.theme);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold gradient-text"
                        >
                            ShopHub
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            Products
                        </Link>
                        <Link to="/categories" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            Categories
                        </Link>
                        <Link to="/deals" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                            Deals
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => dispatch(toggleTheme())}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card text-gray-700 dark:text-gray-300 transition-colors"
                        >
                            {mode === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                        </motion.button>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                            <FaShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* Wishlist */}
                        <Link to="/wishlist" className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                            <FaHeart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-card transition-colors">
                                    <FaUser className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">
                                        Profile
                                    </Link>
                                    <Link to="/orders" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Orders
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:block btn btn-primary text-sm">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card"
                        >
                            {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-gray-200 dark:border-dark-border"
                        >
                            <div className="py-4 space-y-4">
                                <Link to="/products" className="block text-gray-700 dark:text-gray-300">Products</Link>
                                <Link to="/categories" className="block text-gray-700 dark:text-gray-300">Categories</Link>
                                <Link to="/deals" className="block text-gray-700 dark:text-gray-300">Deals</Link>
                                {!isAuthenticated && (
                                    <Link to="/login" className="block btn btn-primary w-full text-center">Login</Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
