import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js'
import fragmentsRouter from './routes/fragments.js' // importas o router (não o controller!)

// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors()); // enable `CORS` for all routes
app.use(express.json()); // enable parsing of json request body
app.use(express.urlencoded({ extended: true}));
app.use('/auth', authRouter);
app.use('/api/images', uploadRouter);
app.use('/fragments', fragmentsRouter); // e registas a rota

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Store uploaded files in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage});

//route handler
app.post('/api/images', upload.single('file'), async (req, res) =>{
  try{
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'Please upload a file'});
      return;
    }
    console.log(file);

  } catch (error) {
    res.status(500).json({ error: error});
  }

});


app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});

