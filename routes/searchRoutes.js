import express from 'express';
import { searchUsersOrProjects } from '../controller/searchController.js';

const router = express.Router();

router.get('/', searchUsersOrProjects); // GET /api/search?q=query

export default router;
