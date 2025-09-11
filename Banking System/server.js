const express = require('express');
const account=require('./models/account');
account();
// const accountRoutes = require('./routes/accountRoutes');

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the Banking System");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
