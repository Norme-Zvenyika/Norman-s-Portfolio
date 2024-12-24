import { Router } from 'express';
import { messageController } from '../controllers/message.controller.js';
import { validateMessageContent, validateMessageId } from '../middleware/validation.middleware.js';

/**
 * message routes
 * @type {Router}
 */
const router = Router();

/**
 * get all messages route
 * @route GET /messages
 */
router.get('/', messageController.getAllMessages);

/**
 * create message route
 * @route POST /messages
 */
router.post('/', validateMessageContent, messageController.createMessage);

/**
 * delete message route
 * @route DELETE /messages/:id
 */
router.delete('/:id', validateMessageId, messageController.deleteMessage);

export default router;