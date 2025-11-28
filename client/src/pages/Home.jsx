import { motion } from 'framer-motion';
import HeroSlider from '../components/home/HeroSlider';
import CategoryGrid from '../components/home/CategoryGrid';
import TrendingProducts from '../components/home/TrendingProducts';

const Home = () => {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <HeroSlider />
            </motion.section>

            {/* Categories */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                    Shop by Category
                </h2>
                <CategoryGrid />
            </motion.section>

            {/* Trending Products */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <TrendingProducts />
            </motion.section>

            {/* Features */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <div className="card text-center">
                    <div className="text-4xl mb-4">🚚</div>
                    <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                    <p className="text-gray-600 dark:text-gray-400">On orders over ₹999</p>
                </div>
                <div className="card text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                    <p className="text-gray-600 dark:text-gray-400">100% secure transactions</p>
                </div>
                <div className="card text-center">
                    <div className="text-4xl mb-4">↩️</div>
                    <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                    <p className="text-gray-600 dark:text-gray-400">30-day return policy</p>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
