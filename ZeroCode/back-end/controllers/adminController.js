const User = require("../models/user");
const loan = require("../models/loan");

exports.listUsers = async (req, res) => { 
    const users = await User.find().select("-password").lean(); 
    res.json(users);
};

exports.setkycStatus = async (req, res) => {
    const { userId, status } = req.body; //"approved"|"rejected"|"pending"
    const updated = await User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });

}