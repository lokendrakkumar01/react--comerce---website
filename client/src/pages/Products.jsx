import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts, setFilters } from '../redux/slices/productSlice';
import ProductGrid from '../components/products/ProductGrid';
import { motion } from 'framer-motion';

const Products = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, loading, filters, pagination } = useSelector((state) => state.products);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            dispatch(setFilters({ category }));
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    const handleFilterChange = (key, value) => {
        dispatch(setFilters({ [key]: value }));
    };

    const handleSortChange = (e) => {
        handleFilterChange('sort', e.target.value);
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {filters.category || 'All Products'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {pagination.total} products found
                        </p>
                    </div>

                    {/* Sort */}
                    <select
                        value={filters.sort}
                        onChange={handleSortChange}
                        className="input w-auto"
                    >
                        <option value="">Sort By</option>
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                    </select>
                </div>

                {/* Filters Bar */}
                <div className="card mb-8">
                    <div className="flex flex-wrap gap-4">
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="input w-auto"
                        >
                            <option value="">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home & Living">Home & Living</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Sports">Sports</option>
                            <option value="Books">Books</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="input w-32"
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="input w-32"
                        />

                        <select
                            value={filters.rating}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="input w-auto"
                        >
                            <option value="">All Ratings</option>
                            <option value="4">4★ & above</option>
                            <option value="3">3★ & above</option>
                            <option value="2">2★ & above</option>
                        </select>

                        <button
                            onClick={() => {
                                dispatch(setFilters({
                                    category: '',
                                    minPrice: '',
                                    maxPrice: '',
                                    rating: '',
                                    sort: '',
                                }));
                            }}
                            className="btn btn-secondary"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <ProductGrid products={products} loading={loading} />

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handleFilterChange('page', page)}
                                className={`px-4 py-2 rounded-lg ${pagination.page === page
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Products;
