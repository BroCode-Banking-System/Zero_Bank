const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const adminRoutes = require("./routes/adminRoutes");
const accountRoutes = require("./routes/accountRoutes");
const manageUserRoutes = require("./routes/manageUserRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

connectdb();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api", accountRoutes);
app.use("/api/admin", manageUserRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Banking System");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
