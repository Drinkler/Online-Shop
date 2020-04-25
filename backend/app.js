const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");

// TODO: api version

// To log requests
app.use(morgan("dev"));

// Make the uploads folder accessible
app.use("/uploads", express.static("uploads"));

// To read Request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handling CORS
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     if (req.method === "OPTIONS") {
//         // Set allowed HTTP Methods
//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(204);
//     }
//     next();
// });

// Import Routes
const api = require("./api");

// Middlewares
app.use("/rest/api", api);

// Handling errors
app.use((req, res, next) => {
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

// Connect to db
mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(console.log("Connected to database."))
    .catch((err) => Console.log("Couldn't connect to database.", err));

// Listen for errors after initial connection was established
mongoose.connection.on("error", (err) => {
    console.log("Error during runtime.", err);
});

// Start server
app.listen(process.env.PORT);
