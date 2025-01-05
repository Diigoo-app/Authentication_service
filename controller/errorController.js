const AppError = require("../utils/appError");

const sendErrorDev = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || false;
    const message = error.message;
    const stack = error.stack;

    res.status(statusCode).json({
        status,
        message,
        stack,
    });
};

const sendErrorProd = (error, res) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || false;
    const message = error.message;
    const stack = error.stack;

    if (error.isOperational) {
        return res.status(statusCode).json({
            status,
            message,
        });
    }

    return res.status(500).json({
        status: false,
        message: "Something went very wrong",
    });
};

const globalErrorHandler = (err, req, res, next) => {
    if (err.name === "TokenExpiredError") {
        err = new AppError("TokenExpiredError", 200);
    }

    if (err.name === "ValidationError") {
        err = new AppError(err.message, 400);
    }

    if (err.name === "SequelizeValidationError") {
        err = new AppError(err.errors[0].message, 400);
    }
    if (err.name === "SequelizeUniqueConstraintError") {
        err = new AppError(err.errors[0].message, 400);
    }
    if (process.env.NODE_ENV === "development") {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};

module.exports = globalErrorHandler;