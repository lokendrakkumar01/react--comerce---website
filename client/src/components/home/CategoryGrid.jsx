import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTshirt, FaMobileAlt, FaHome, FaBook, FaDumbbell, FaGem } from 'react-icons/fa';

const categories = [
    { name: 'Fashion', icon: FaTshirt, color: 'bg-pink-500', link: '/products?category=Fashion' },
    { name: 'Electronics', icon: FaMobileAlt, color: 'bg-blue-500', link: '/products?category=Electronics' },
    { name: 'Home & Living', icon: FaHome, color: 'bg-green-500', link: '/products?category=Home%20%26%20Living' },
    { name: 'Books', icon: FaBook, color: 'bg-yellow-500', link: '/products?category=Books' },
    { name: 'Sports', icon: FaDumbbell, color: 'bg-red-500', link: '/products?category=Sports' },
    { name: 'Beauty', icon: FaGem, color: 'bg-purple-500', link: '/products?category=Beauty' },
];

const CategoryGrid = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                    <Link key={category.name} to={category.link}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="card text-center group cursor-pointer"
                        >
                            <div className={`${category.color} w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Icon className="text-3xl text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                {category.name}
                            </h3>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
};

export default CategoryGrid;
