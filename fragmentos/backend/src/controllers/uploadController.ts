import { Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { decode } from 'base64-arraybuffer';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
    res.status(400).json({ message: 'Please upload a file' });
    return;
    }

    // validar tipo de ficheiro
    const allowedTypes = ['image/', 'video/', 'audio/', 'text/'];
    const isAllowed = allowedTypes.some(type => file.mimetype.startsWith(type));

    if (!isAllowed) {
      res.status(400).json({ message: 'Tipo de ficheiro não permitido. Apenas imagem, vídeo, áudio ou texto.' });
      return;
    }

    const fileBase64 = decode(file.buffer.toString('base64'));

    const { data, error } = await supabase.storage
      .from('fragments-media') 
      .upload(file.originalname, fileBase64, {
          contentType: file.mimetype,
    });

    if (error) {
      throw error;
    }

    const { data: image } = supabase.storage
      .from('fragments-media')  // ← era 'images'
      .getPublicUrl(data.path);

    const { error: dbError } = await supabase
      .from('fragments')  // o nome da tua tabela
      .insert({ media_url: image.publicUrl,
                media_type: file.mimetype,
                user_id: req.user?.id,
                text: req.body.text,
                category: req.body.category, });  // os campos da tua tabela

    if (dbError) {
      throw dbError;
    }

    res.status(200).json({ image: image.publicUrl });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};