import { StatusCodes } from "http-status-codes";
import { AppError } from "../middleware/error.middleware.js";

export const ERROR_MESSAGES = {
    INVALID_NAME: 'name is required and must be between 2 and 100 characters',
    INVALID_EMAIL: 'please provide a valid email address',
    INVALID_MESSAGE_ID: 'invalid message id format (must be a UUID)',
    INVALID_MESSAGE: 'message content is required and cannot be empty',
    DATABASE_ERROR: 'database operation failed'
};

export const throwError = (message, statusCode) => {
    throw new AppError(message, statusCode);
};