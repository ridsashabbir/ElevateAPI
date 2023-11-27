const express = require("express");
const dotenv = require("dotenv").config();
// this will access port number from .env file if it's unable to access it, it will use 5000 as port no.
const port = process.env.PORT || 5000;
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

// created middleware to accept body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
