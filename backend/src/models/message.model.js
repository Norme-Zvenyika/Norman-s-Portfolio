import { query } from "../../config/db.config.js";
import { SQL_QUERIES } from "../../db/queries.js";
import { AppError } from "../middleware/error.middleware.js";
import { StatusCodes } from "http-status-codes";

export const messageModel = {
    /**
     * gets all messages ordered by creation date
     * @returns {Array} array of messages
     */
    async getAllMessages() {
        try {
            // build a query object using GET_ALL_MESSAGES
            const queryObject = {
                sql: SQL_QUERIES.GET_ALL_MESSAGES.text,
                params: [],
            };

            return await query(queryObject);
        } catch (error) {
            throw new AppError("failed to get messages", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    /**
     * creates a new message
     * @param {string} name - sender name
     * @param {string} email - sender email
     * @param {string} message - message content
     * @returns {object} created message
     */
    async createMessage(name, email, message) {
        try {
            // build a query object using INSERT_MESSAGE
            const queryObject = {
                sql: SQL_QUERIES.INSERT_MESSAGE.text,
                params: [name, email, message],
            };

            const [newMessage] = await query(queryObject);

            return newMessage;
        } catch (error) {
            console.error("error creating message:", error);
            throw new AppError("failed to create message", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },

    /**
     * deletes a message by id
     * @param {number} id - message id
     * @returns {object} deleted message
     */
    async deleteMessage(id) {
        try {
            // build a query object using DELETE_MESSAGE
            const queryObject = {
                sql: SQL_QUERIES.DELETE_MESSAGE.text,
                params: [id],
            };

            const [deletedMessage] = await query(queryObject);
            return deletedMessage;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("failed to delete message", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    },
};
