const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

connectdb();

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Welcome to the Banking System");
});
app.use("/api/accounts", accountRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
