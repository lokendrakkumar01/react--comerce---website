import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingProducts } from '../../redux/slices/productSlice';
import ProductCard from '../products/ProductCard';
import SkeletonLoader from '../common/SkeletonLoader';

const TrendingProducts = () => {
    const dispatch = useDispatch();
    const { trendingProducts, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchTrendingProducts());
    }, [dispatch]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Trending Products
            </h2>
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SkeletonLoader type="card" count={4} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingProducts.slice(0, 8).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrendingProducts;
