import { Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';

export const getProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Não autenticado' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', req.user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    return res.status(500).json({ message: 'Erro ao buscar perfil' });
  }

  return res.status(200).json({ data });
};

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Não autenticado' });
  }

  const { username, bio, avatar_url } = req.body;

  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: req.user.id,
      username,
      bio,
      avatar_url,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }

  return res.status(200).json({ data });
};