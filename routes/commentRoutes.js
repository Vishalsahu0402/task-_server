import express from 'express';
import { createComment } from '../controller/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/comments/:projectId
router.post('/:projectId', protect, createComment);

export default router;
