const express = require('express');
const txn = require('./models/transection');
txn();

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the BaSystemnking");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
