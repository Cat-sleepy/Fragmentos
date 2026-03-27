import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';


const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password são obrigatórios.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'A password deve ter pelo menos 6 caracteres.' });
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    message: 'Utilizador registado com sucesso.',
    user: data.user,
  });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e password são obrigatórios.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Login efetuado com sucesso.',
    user: data.user,
    session: data.session,
  });
});

import { authenticateToken } from '../middleware/authMiddleware.js';

router.get('/perfil', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;