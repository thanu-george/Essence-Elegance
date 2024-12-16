import express from 'express';
import { register, login } from '../Controllers/user.js';

const router = express.Router();

// Define your routes
router.post('/register', register);
router.post('/login', login);

export default router;

