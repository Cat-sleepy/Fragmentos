import { Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';

export const getFragments = async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .rpc('get_random_fragments')
    
    if (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Erro ao gerar Doença Neural',
        });
    }

    return res.status(200).json({
        data,
    });
};



