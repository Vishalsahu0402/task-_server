import express from 'express';
import { searchUsersAndProjects } from '../controller/searchController.js';

const router = express.Router();

router.get('/', searchUsersAndProjects); // GET /api/search?query=something

export default router;
