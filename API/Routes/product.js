import express from 'express';
import { addprod,findprod,updateprod } from '../Controllers/product.js';

const router = express.Router();
router.post('/add',addprod)
router.get('/:id',findprod)
router.put('/:id',updateprod)
export default router;