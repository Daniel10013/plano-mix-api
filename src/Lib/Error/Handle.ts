import AppError from './AppError';

type errorInfo = {
    json: object, 
    statusCode: number 
}

const handleError = (errorObj: Error): errorInfo => {
    if (errorObj instanceof AppError) {
        return {
            json: {
                success: false,
                message: errorObj.message
            },
            statusCode: errorObj.status_code
        }
    }
    return {
        json: {
            success: false,
            message: errorObj.message || "Erro desconhecido!"
        },
        statusCode: 500
    }
}

export default handleError;