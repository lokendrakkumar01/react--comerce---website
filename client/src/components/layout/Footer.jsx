import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4">ShopHub</h3>
                        <p className="text-gray-400 mb-4">
                            Your one-stop destination for all your shopping needs. Quality products at the best prices.
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Built by <span className="text-primary-400 font-semibold">Lokendrakumar</span> - Full Stack Developer (MERN Stack)
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://linkedin.com/in/lokendrakumar13"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://x.com/LokendraKu39266?t=Vl5M7_gl6DIuzU2rOWyZcg&s=09"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/loke_ndrakumar123?igsh=MTJvd3RnZzh5Y2Zrbw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="http://www.youtube.com/@uaacademy9629"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
                            <li><Link to="/deals" className="text-gray-400 hover:text-white transition-colors">Deals</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe to get special offers and updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <button className="px-4 py-2 bg-primary-500 rounded-r-lg hover:bg-primary-600 transition-colors">
                                <FaEnvelope />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 ShopHub. All rights reserved.</p>
                    <p className="text-sm mt-2">
                        Developed with ❤️ by <a href="https://linkedin.com/in/lokendrakumar13" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">Lokendrakumar</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
