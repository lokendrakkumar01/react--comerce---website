import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide a product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: 0,
        },
        originalPrice: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Groceries'],
        },
        subcategory: {
            type: String,
            default: '',
        },
        images: [
            {
                url: String,
                public_id: String,
            },
        ],
        colors: [String],
        sizes: [String],
        stock: {
            type: Number,
            required: [true, 'Please provide stock quantity'],
            min: 0,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
        featured: {
            type: Boolean,
            default: false,
        },
        trending: {
            type: Boolean,
            default: false,
        },
        brand: {
            type: String,
            default: '',
        },
        tags: [String],
    },
    {
        timestamps: true,
    }
);

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
