import { Router } from 'express';
import { getFragmentById, getFragments, getMyFragments, updateFragment, deleteFragment } from '../controllers/fragmentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';



const router = Router ();

router.get('/', getFragments);
router.get('/mine', authenticateToken, getMyFragments);
router.get('/:id', getFragmentById);
router.put('/:id', authenticateToken, updateFragment);
router.delete('/:id', authenticateToken, deleteFragment);

export default router;