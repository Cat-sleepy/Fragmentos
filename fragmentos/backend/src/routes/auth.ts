import { Router } from 'express';
import { register, login, perfil } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', authenticateToken, perfil);

export default router;