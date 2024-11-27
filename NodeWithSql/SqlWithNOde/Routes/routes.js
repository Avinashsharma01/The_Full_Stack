import express from 'express';
import { getCon, putcon, postcon } from '../Controller/Controller.js';

const router = express.Router();


router.get('/getdata', getCon);
router.post('/postdata', postcon);
router.put('/putdata', putcon);


export default router;