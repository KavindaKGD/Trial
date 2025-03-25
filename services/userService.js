const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (userData) => {
    // Check if user exists
    let user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exists');
    }

    // Create new user
    user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    };
};

// Authenticate user
const loginUser = async (email, password) => {
    // Check for user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken(user._id);

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    };
};

// Get user by ID
const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

// Update user
const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true
    }).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

// Delete user
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return { message: 'User removed' };
};

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser
};