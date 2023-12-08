
class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.status = statusCode || 404
        this.labelName = 'AppError'
    }
}

module.exports = AppError