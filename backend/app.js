const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// To read req.body
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const userRoute = require("./routes/user");

app.use("/user", userRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home");
});

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connected to database.");
});

app.listen(3000);
