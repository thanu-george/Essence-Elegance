import express from 'express';
import { add }  from '../Controllers/cont.js';

const router = express.Router();
router.post('/add',add);

export default router;