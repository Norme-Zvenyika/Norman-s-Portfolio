// src/middleware/message.middleware.js
import { StatusCodes } from "http-status-codes";
import { ERROR_MESSAGES, throwError } from "../utils/error.constants.js";
import { isValidEmail, isValidUUID } from "../utils/validators.js";

/**
 * validates message request body
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
export const validateMessageContent = (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // validate name
        if (!name || typeof name !== 'string' ||
            name.trim().length < 2 || name.trim().length > 100) {
            throwError(ERROR_MESSAGES.INVALID_NAME, StatusCodes.BAD_REQUEST);
        }

        // validate email
        if (!email || !isValidEmail(email)) {
            throwError(ERROR_MESSAGES.INVALID_EMAIL, StatusCodes.BAD_REQUEST);
        }

        // validate message
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            throwError(ERROR_MESSAGES.INVALID_MESSAGE, StatusCodes.BAD_REQUEST);
        }

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * validates message request body
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {function} next - express next function
 */
export const validateMessageId = (req, res, next) => {
    try {
        const { id } = req.params;

        // validate message id
        if (!id || !isValidUUID(id)) {
            throwError(ERROR_MESSAGES.INVALID_MESSAGE_ID, StatusCodes.BAD_REQUEST);
        }

        next();
    } catch (error) {
        next(error);
    }
};