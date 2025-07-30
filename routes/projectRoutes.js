import express from 'express';
import { createProject, getAllProjects, getProjectWithComments } from '../controller/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ✅ POST /api/projects – only for authenticated users
router.post('/', protect, createProject);


router.get('/', getAllProjects);         // view all
router.get('/:id', getProjectWithComments);


export default router;
