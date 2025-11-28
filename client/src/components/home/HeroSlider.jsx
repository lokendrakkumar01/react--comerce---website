import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
    {
        id: 1,
        title: 'Summer Sale',
        subtitle: 'Up to 50% Off',
        description: 'Shop the latest trends',
        bgColor: 'from-blue-500 to-purple-600',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    },
    {
        id: 2,
        title: 'New Arrivals',
        subtitle: 'Fresh Collection',
        description: 'Discover the newest products',
        bgColor: 'from-pink-500 to-orange-500',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200',
    },
    {
        id: 3,
        title: 'Electronics Deals',
        subtitle: 'Best Prices',
        description: 'Latest gadgets at unbeatable prices',
        bgColor: 'from-green-500 to-teal-600',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
    },
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative h-[500px] overflow-hidden rounded-2xl">
            {slides.map((slide, index) => (
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: currentSlide === index ? 1 : 0,
                        scale: currentSlide === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 0.7 }}
                    className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}
                >
                    <div className="absolute inset-0 bg-black/30" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                    />

                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                                y: currentSlide === index ? 0 : 20,
                                opacity: currentSlide === index ? 1 : 0,
                            }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-white"
                        >
                            <h2 className="text-5xl md:text-7xl font-bold mb-4">{slide.title}</h2>
                            <p className="text-2xl md:text-3xl font-semibold mb-2">{slide.subtitle}</p>
                            <p className="text-lg md:text-xl mb-8">{slide.description}</p>
                            <button className="btn btn-primary text-lg px-8 py-4">
                                Shop Now
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all"
            >
                <FaChevronLeft className="text-white text-xl" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full transition-all"
            >
                <FaChevronRight className="text-white text-xl" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
