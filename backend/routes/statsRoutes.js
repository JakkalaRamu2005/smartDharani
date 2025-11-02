import express from 'express';
import { getOnlineUsers } from '../controllers/statsController.js';

const router = express.Router();

router.get('/online-users', getOnlineUsers);

export default router;
