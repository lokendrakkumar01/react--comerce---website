# E-Commerce Website - Full Stack React Application

A modern, fully responsive e-commerce platform built with React.js, Node.js, Express, MongoDB, and featuring Stripe payment integration, JWT authentication, and a comprehensive admin dashboard.

## ✨ Features

### Frontend
- 🎨 Modern UI with Tailwind CSS and Framer Motion animations
- 🌗 Dark/Light mode toggle
- 📱 Fully responsive design
- 🛒 Shopping cart with real-time updates
- 💳 Stripe payment integration
- 🔍 Advanced product filtering and sorting
- ⭐ Product reviews and ratings
- 💝 Wishlist functionality
- 👤 User authentication (JWT)
- 📦 Order history and tracking
- 🎯 Dynamic product categories
- 🖼️ Image zoom and gallery
- 🎭 Skeleton loading states
- 🔔 Toast notifications

### Backend
- 🚀 RESTful API with Express.js
- 🗄️ MongoDB database with Mongoose
- 🔐 JWT authentication
- 🖼️ Cloudinary image storage
- 💰 Stripe payment processing
- 🛡️ Input validation and error handling
- 📧 Password reset functionality
- 👥 User roles (user/admin)
- 📊 Order management
- 🏷️ Coupon system

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Stripe React** - Payment integration
- **React Icons** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Stripe** - Payment processing
- **Multer** - File uploads

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- Stripe account

### Environment Variables

Create `.env` file in the `server` directory:

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

Create `.env` file in the `client` directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation Steps

1. **Clone the repository**
   ```bash
   cd "C:\Users\loken\Downloads\react -comerce   website"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start MongoDB**
   - If using local MongoDB, ensure it's running
   - If using MongoDB Atlas, ensure your connection string is correct

5. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

6. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

## 📖 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `POST /api/products/:id/images` - Upload product images (admin)
- `GET /api/products/trending` - Get trending products
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/status` - Update order status (admin)
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders/validate-coupon` - Validate coupon code

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/verify` - Verify payment
- `POST /api/payment/webhook` - Stripe webhook

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/address` - Add address
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `GET /api/users` - Get all users (admin)

## 🎨 Features Showcase

### User Features
- **Product Browsing**: Filter by category, price, ratings
- **Product Details**: Image gallery, variants (color/size), reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Secure Stripe payment, shipping address
- **User Account**: Profile management, order history
- **Wishlist**: Save favorite products

### Admin Features
- **Product Management**: Add, edit, delete products
- **Image Upload**: Cloudinary integration
- **Order Management**: View and update order status
- **User Management**: View all users

## 🚀 Production Deployment

### Backend Deployment (e.g., Render, Railway)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Add environment variables
4. Deploy

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

## 📝 Default Admin Account

To create an admin user, manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🎯 Sample Coupon Codes

- `WELCOME10` - 10% off
- `SAVE20` - 20% off
- `FLAT100` - ₹100 off

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for learning purposes

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from React Icons
- UI inspiration from modern e-commerce platforms

---

**Note**: This is a demo project. For production use, please ensure proper security measures, error handling, and testing are implemented.
