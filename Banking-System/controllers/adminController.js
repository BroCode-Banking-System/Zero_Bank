const User = require("../models/User");
exports.listUsers = async (req, res) => { 
    const users = await User.find().select("-password").lean(); 
}; 
res.json(users);
exports.setkycStatus = async (req, res) => {
    const { userld, status } = req.body; //"approved"|"rejected"|"pending" const updated = await
User.findByldAndUpdate(userld, { kycStatus: status }, { new: true }).select("-password"); 
if (!updated) return res.status(404).json({ message: "User not found" });

}