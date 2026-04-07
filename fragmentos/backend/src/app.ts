import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import fragmentsRouter from './routes/fragments.js';
import profileRouter from './routes/profile.js';


// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://fragmentos-frontend.vercel.app',
    'https://fragmentos-frontend-bj6buo5zb-cat-sleepys-projects.vercel.app'
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/api/images', uploadRouter);
app.use('/fragments', fragmentsRouter);
app.use('/profile', profileRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/images', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'Please upload a file' });
      return;
    }
    console.log(file);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
  });
}