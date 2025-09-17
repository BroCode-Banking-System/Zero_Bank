const User = require('../models/user');

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email, password });
        if (!existingUser) {
            return res.json({ 
                message: 'Invalid email or password' 
            });
        }
        res.json({ user: existingUser });
    } catch (error) {
        res.json({ err });
    }
};
// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.json({ 
                message: 'User not found' 
            });
        }
        res.json({ user: updatedUser });
    } catch (error) {
        res.json({ err });
    }
};
// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.json({ 
                message: 'User not found' 
            });
        }
        res.json({ user: deletedUser });
    } catch (error) {
        res.json({ err });
    }
};