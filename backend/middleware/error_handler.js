const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {

    console.log(err)

    let customError = {
        message: err.message || 'Something went wrong, please try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: err.statusCode
    }

    // Duplication Error
    if (err.code === 11000) {
        customError.message = 'key already exists, choose another one'
    }

    // Request time-out error
    if (err.name === 'TimeoutError') {
        res.status(408).send('Request Timeout');
    }

    res.status(customError.statusCode).json(customError)
}

module.exports = errorHandlerMiddleware