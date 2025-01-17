// Load environment variables from .env file into process.env

require("dotenv").config({ path: `${process.cwd()}/.env` });

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/CorsConfig");
const helmet = require("helmet");
const xss = require("xss-clean");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const authenticationRoutes=require("./routes/authentication")

const globalErrorHandler = require("./controller/errorController");

app.use(cors(corsOptions));

// Middleware to sanitize user input against XSS (Cross-site scripting)
app.use(xss());

// Middleware to set various HTTP headers for security
app.use(helmet());

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use("/authentication",authenticationRoutes)


// Basic route for the root URL
app.get("/authentication", (req, res, next) => {
    // Send a welcome message
    res.status(200).send("Welcome back to the  authentication service.");
});

//This Routes For Management Users Only - Added By Javahar


//-- Ends Javahar Code ----------------

// Route for audit-related endpoints

// Catch-all route handler for undefined routes
app.use(
    "*",
    catchAsync(async (req, res, next) => {
        // Create and forward an error for unknown routes
        return next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
    })
);

// Global error handling middleware
app.use(globalErrorHandler);

// Start the server on the specified port from environment variables or default to 7010
const PORT = process.env.APP_PORT || 7010;

app.listen(PORT, () => {
    console.log("Deal - Server up & running on port", PORT);
});
