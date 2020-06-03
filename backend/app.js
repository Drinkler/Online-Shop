const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

// Swagger setup
options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Online Shop - Microservices",
            version: "1.0.0",
            description: "API Documentation for the backend of the Online Shop.",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            },
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: "Info@SmartBear.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080/rest/api",
                description: "Local server",
            },
        ],
    },
    apis: ["./api/**/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/rest/api/docs", swaggerUi.serve);
app.get(
    "/rest/api/docs",
    swaggerUi.setup(specs, {
        explorer: true,
    })
);

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

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

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
