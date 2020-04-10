const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// TODO: api version

// To read Request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const userRoute = require("./routes/user");

// Middlewares
app.use("/user", userRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home");
});

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to database.");
});

// Start server
app.listen(process.env.PORT);
