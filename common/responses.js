// success response
module.exports.successResponse = (res, statusCode, message, data) => {
    return res.json({ 
        statusCode,
        message,
        data: data || null
    });
}

// error response
module.exports.errorResponse = (res, statusCode, message) => {
    return res.json({ 
        statusCode: statusCode ? statusCode : 208,
        message : message || null,
        data: null
    });
}
