import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@shophub.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', existingAdmin.email);
            console.log('Role:', existingAdmin.role);

            // Update to admin if not already
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin';
                await existingAdmin.save();
                console.log('✅ User updated to admin role');
            }

            process.exit(0);
        }

        // Create admin user
        const adminUser = await User.create({
            name: 'Administrator',
            email: 'admin@shophub.com',
            password: 'admin123456',
            role: 'admin',
        });

        console.log('✅ Admin user created successfully!');
        console.log('==================================');
        console.log('Email:', adminUser.email);
        console.log('Password: admin123456');
        console.log('Role:', adminUser.role);
        console.log('==================================');
        console.log('You can now login with these credentials');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();
