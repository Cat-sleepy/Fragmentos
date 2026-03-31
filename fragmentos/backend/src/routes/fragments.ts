import { Router } from 'express';
import { getFragments } from '../controllers/fragmentController.js';


const router = Router ();

router.get('/', getFragments);

export default router;