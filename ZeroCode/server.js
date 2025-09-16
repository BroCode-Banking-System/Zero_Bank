const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const port = 8000;
const connectdb = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectdb();

app.get("/", (req, res) => {
  res.send("Welcome to the Banking System");
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});