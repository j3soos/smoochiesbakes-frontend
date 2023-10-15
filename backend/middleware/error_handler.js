const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log("Middleware is working!");

    let customError = {
        message: err.message || 'Something went wrong, please try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: err.statusCode
    }

    // Duplication Error
    if (err.code === 11000) {
        customError.message = 'Key already exists, choose another one';
        res.status(customError.statusCode).json(customError);
    } else if (err.name === 'TimeoutError') {
        // Request time-out error
        res.status(408).send('Request Timeout');
    } else {
        // Call next to pass control to the next middleware/error handler
        next(err);
    }
}

module.exports = errorHandlerMiddleware;
