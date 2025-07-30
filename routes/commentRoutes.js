import express from 'express';
import { protect } from '../middleware/auth.js'; // Adjust if path differs
import Project from '../models/project.js';

const router = express.Router();

// POST /api/projects/:id/comments
router.post('/:id/comments', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        const newComment = {
            user: req.user.id, // From token middleware
            text: req.body.text
        };

        project.comments.push(newComment);
        await project.save();

        res.status(200).json(project.comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
