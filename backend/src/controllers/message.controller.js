import { messageModel } from '../models/message.model.js';
import { catchAsync } from '../middleware/error.middleware.js';
import { StatusCodes } from 'http-status-codes';

export const messageController = {
    /**
     * gets all messages
     * @param {object} req - express request object
     * @param {object} res - express response object
     */
    getAllMessages: catchAsync(async (req, res) => {
        const messages = await messageModel.getAllMessages();

        if (!messages) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'no messages found'
            });
        }

        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: messages
        });
    }),

    /**
     * creates a new message
     * @param {object} req - express request object
     * @param {object} res - express response object
     */
    createMessage: catchAsync(async (req, res) => {
        const { name, email, message } = req.body;

        const newMessage = await messageModel.createMessage(name, email, message);

        return res.status(StatusCodes.CREATED).json({
            status: 'success',
            data: newMessage
        });
    }),

    /**
     * deletes a message
     * @param {object} req - express request object
     * @param {object} res - express response object
     */
    deleteMessage: catchAsync(async (req, res) => {
        const { id } = req.params;
        const deletedMessage = await messageModel.deleteMessage(id);

        if (!deletedMessage) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'message not found'
            });
        }

        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: deletedMessage
        });
    })
};