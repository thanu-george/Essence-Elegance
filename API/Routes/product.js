import express from 'express';
import { addprod,getprod,updateprod } from '../Controllers/product.js';

const router = express.Router();
router.post('/add',addprod);
router.put('/:pid',updateprod);
router.get('/:pid',getprod);

export default router;
