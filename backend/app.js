const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// To read Request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const api = require("./api");

// Middlewares
app.use("/rest/api", api);

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to database.");
});

// Start server
app.listen(process.env.PORT);
