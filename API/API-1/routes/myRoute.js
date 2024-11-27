import express from 'express';
const router = express.Router();
import { home, getAlldata, the_productData } from '../controllers/myController.js';


router.get('/', home);

router.route('/getAlldata').get(getAlldata);
router.route('/the_productData').get(the_productData);


export default router;