const userService = require('../services/userService');

// @desc    Register a new user
const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Authenticate a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Get user data
const getMe = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// @desc    Update user
const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// @desc    Delete user
const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
};