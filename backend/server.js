const express = require("express");
const dotenv = require("dotenv").config();
// this will access port number from .env file if it's unable to access it, it will use 5000 as port no.
const port = process.env.PORT || 5000;

const app = express();

app.get("/api/goals", (req, res) => {
  // res.send("Get Goals");   // it will work too but better practice is to send json object
  // res.json({ message: "Get goals" });
  res.status(200).json({ message: "Get goals" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
