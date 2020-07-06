const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const mkdirp = require("mkdirp");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// To log requests
app.use(morgan("dev"));

// Make the productImages folder accessible
app.use("/productImages", express.static("productImages"));

// Create folder for product images
mkdirp.sync("./productImages");

// To read Request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        // Set allowed HTTP Methods
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(204);
    }
    next();
});

// Import Routes
const api = require("./api");

// Middlewares
app.use("/rest/api", api);

// Handling errors
app.use((req, res, next) => {
    const error = new Error("Not found");
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

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Handling MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, options).then(
    () => {
        console.log("Connected to database.");
    },
    (err) => {
        console.log("Couldn't connect to database.");
    }
);

mongoose.connection.on("connecting", function () {
    console.log("connecting to MongoDB...");
});

mongoose.connection.on("error", function (error) {
    console.log("Error in MongoDb connection");
    mongoose.connect(process.env.DB_CONNECTION, options).then(
        () => {
            console.log("Connected to database.");
        },
        (err) => {
            console.log("Couldn't connect to database.");
        }
    );
});

mongoose.connection.on("reconnected", function () {
    console.log("MongoDB reconnected!");
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected!");
});

// Start server
app.listen(process.env.PORT || 3000);
