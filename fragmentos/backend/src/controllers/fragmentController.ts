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


export const getMyFragments = async (req: Request, res: Response) => {
    if (!req.user) {
    return res.status(401).json({ message: 'Não autenticado' });
}

    const { data, error } = await supabase
        .from('fragments')
        .select()
        .eq('user_id', req.user.id)
    
    if (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Erro ao gerar imagem',
        });
    }

    return res.status(200).json({
        data,
    });
};

export const getFragmentById = async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('fragments')
        .select()
        .eq('id', req.params.id)
        .single()  // ← importante!
    
    // aqui tratas o erro
    if (error) {
    if (error.code === 'PGRST116') {
        return res.status(404).json({
            message: 'Este ficheiro não existe'
        })
    }
    console.log(error);
    return res.status(500).json({
        message: 'Erro ao gerar imagem',
    })
}


     // aqui devolves o sucesso
    return res.status(200).json({
        data,
    })

};



