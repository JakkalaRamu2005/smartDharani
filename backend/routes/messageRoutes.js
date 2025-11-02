import express from 'express';
import { getUnreadMessageCount } from '../controllers/messageController.js';

const router = express.Router();

router.get('/unread/:userId', getUnreadMessageCount);

export default router;
