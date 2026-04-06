import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/uploadController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticateToken, upload.single('file'), uploadFile);

export default router;