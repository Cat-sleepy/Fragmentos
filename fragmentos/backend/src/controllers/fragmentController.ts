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

export const updateFragment = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
    }

    // 1. buscar o fragmento pelo id
    const { data: fragment, error } = await supabase
        .from('fragments')
        .select()
        .eq('id', req.params.id) // id do fragmento (vem na URL /fragments/123)
        .single()

    if (error) {
    if (error.code === 'PGRST116') {
        return res.status(404).json({
            message: 'O fragmento não existe'
        })
    }
    console.log(error);
    return res.status(500).json({
        message: 'Erro ao gerar Doença Neural',
    });
}

    if(!fragment) {
        return res.status(404).json({
            message: 'O fragmento não exite'
        })
    }
    if(fragment.user_id !== req.user.id) {
        return res.status(403).json({
            message: 'Não és o dono deste fragmento!',
        });
    }

    const { data: updated, error: updateError } = await supabase
        .from('fragments')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single()

    if (updateError) {
    console.log(updateError);
    return res.status(500).json({
        message: 'Erro ao atualizar fragmento',
    });
}

return res.status(200).json({
    data: updated,
});

};

export const deleteFragment = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Não autenticado' });
    }

    // 1. buscar o fragmento
    const { data: fragment, error } = await supabase
        .from('fragments')
        .select()
        .eq('id', req.params.id)
        .single()

    if (error) {
        if (error.code === 'PGRST116') {
            return res.status(404).json({ message: 'O fragmento não existe' })
        }
        console.log(error);
        return res.status(500).json({ message: 'Erro ao buscar fragmento' });
    }

    if (!fragment) {
        return res.status(404).json({ message: 'O fragmento não existe' })
    }

    // 2. verificar se é o dono
    if (fragment.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Não és o dono deste fragmento!' });
    }

    // 3. apagar do Storage
    const { error: storageError } = await supabase
        .storage
        .from('fragments')
        .remove([fragment.file_path])

    if (storageError) {
        console.log(storageError);
        return res.status(500).json({ message: 'Erro ao apagar ficheiro do storage' });
    }

    // 4. apagar da DB
    const { error: deleteError } = await supabase
        .from('fragments')
        .delete()
        .eq('id', req.params.id)

    if (deleteError) {
        console.log(deleteError);
        return res.status(500).json({ message: 'Erro ao eliminar fragmento' });
    }

    return res.status(200).json({ message: 'Fragmento eliminado com sucesso' });
};







