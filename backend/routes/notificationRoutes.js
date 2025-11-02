import express from 'express';
import { getNotificationCount, markNotificationsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/count/:userId', getNotificationCount);
router.put('/read/:userId', markNotificationsRead);

export default router;
