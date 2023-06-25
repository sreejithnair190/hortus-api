class AppError extends Error{
    constructor(message, statusCode){
        super(message);

        this.message = message;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statusCode;
        this.isOpertaional = true;

        Error.captureStackTrace(this, this.constructor); 
    }
}

module.exports = AppError;