const logger = require('./logger')

const requestDetails = (request, response, next) => {
    logger.info(request.method, request.url)
    if (Object.keys(request.body).length !== 0) {
        logger.info(request.body)
    }
    next()
}

module.exports = {
    requestDetails
}