import { Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { decode } from 'base64-arraybuffer';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const texto = req.body.text;
    const categoria = req.body.category;

    // se não há ficheiro nem texto, rejeita
    if (!file && !texto) {
      res.status(400).json({ message: 'Por favor envia um ficheiro ou texto.' });
      return;
    }

    let mediaUrl = null;
    let mediaType = null;

    if (file) {
      // validar tipo de ficheiro
      const allowedTypes = ['image/', 'video/', 'audio/', 'text/'];
      const isAllowed = allowedTypes.some(type => file.mimetype.startsWith(type));

      if (!isAllowed) {
        res.status(400).json({ message: 'Tipo de ficheiro não permitido.' });
        return;
      }

      const fileBase64 = decode(file.buffer.toString('base64'));

      const { data, error } = await supabase.storage
        .from('fragments-media')
        .upload(file.originalname, fileBase64, {
          contentType: file.mimetype,
        });

      if (error) throw error;

      const { data: image } = supabase.storage
        .from('fragments-media')
        .getPublicUrl(data.path);

      mediaUrl = image.publicUrl;
      mediaType = file.mimetype;
    }

    const { error: dbError } = await supabase
      .from('fragments')
      .insert({
        media_url: mediaUrl,
        media_type: mediaType,
        user_id: req.user?.id,
        text: texto,
        category: categoria,
      });

    if (dbError) throw dbError;

    res.status(200).json({ message: 'Fragmento submetido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};