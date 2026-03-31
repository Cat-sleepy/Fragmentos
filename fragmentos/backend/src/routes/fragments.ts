import { Router } from 'express';
import { getFragments, getMyFragments } from '../controllers/fragmentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = Router ();

router.get('/', getFragments);
router.get('/mine', authenticateToken, getMyFragments);

export default router;