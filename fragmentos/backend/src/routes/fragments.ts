import { Router } from 'express';
import { getFragmentById, getFragments, getMyFragments } from '../controllers/fragmentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';



const router = Router ();

router.get('/', getFragments);
router.get('/mine', authenticateToken, getMyFragments);
router.get('/:id', getFragmentById);

export default router;