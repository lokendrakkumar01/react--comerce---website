const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className="bg-white dark:bg-dark-card rounded-xl p-4 shadow-lg">
                        <div className="skeleton h-48 w-full rounded-lg mb-4" />
                        <div className="skeleton h-4 w-3/4 rounded mb-2" />
                        <div className="skeleton h-4 w-1/2 rounded mb-3" />
                        <div className="skeleton h-10 w-full rounded" />
                    </div>
                );

            case 'list':
                return (
                    <div className="bg-white dark:bg-dark-card rounded-lg p-4 mb-4 shadow">
                        <div className="flex gap-4">
                            <div className="skeleton h-16 w-16 rounded" />
                            <div className="flex-1">
                                <div className="skeleton h-4 w-3/4 rounded mb-2" />
                                <div className="skeleton h-4 w-1/2 rounded" />
                            </div>
                        </div>
                    </div>
                );

            case 'text':
                return (
                    <div className="space-y-2">
                        <div className="skeleton h-4 w-full rounded" />
                        <div className="skeleton h-4 w-5/6 rounded" />
                        <div className="skeleton h-4 w-4/6 rounded" />
                    </div>
                );

            default:
                return <div className="skeleton h-20 w-full rounded" />;
        }
    };

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </>
    );
};

export default SkeletonLoader;
