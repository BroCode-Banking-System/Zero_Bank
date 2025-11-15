const User = require("../models/userModel");

// GET Dashboard Data for a user
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.params.id;

    // find user by ID
    const user = await User.findById(userId).select(
      "fullName totalBalance monthlySpending todayTransactions"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // send back the user dashboard data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

