import express from 'express';
import { createUser, LoginUser, verifyUser } from '../controller/userController.js';
// import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/createuser',  createUser);
router.post('/loginuser',  LoginUser);
router.get('/verify',  verifyUser);

export default router;
