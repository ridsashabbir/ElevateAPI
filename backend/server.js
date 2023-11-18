const express = require("express");
const dotenv = require("dotenv").config();
// this will access port number from .env file if it's unable to access it, it will use 5000 as port no.
const port = process.env.PORT || 5000;

const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
