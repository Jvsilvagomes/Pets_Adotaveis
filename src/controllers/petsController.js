import dados from "../models/dados.js";

const { pets } = dados;
let resultado = pets;

const getAllPets = (req,res) =>{
    
    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
}

const getPetsById = (req,res) => {
    const id = parseInt(req.params.id)
    const pet = pets.find( p => p.id === id)

    if (!pet){
        res.status(404).json({
            success: false,
            message: `pet noot found, ${id}`
        })
    }

    res.status(200).json({
        total: pet.length,
        data: pet
    })
}

const  createPet = (req,res) => {
    const { nome, especie, raca, idade, peso, disponivel } = req.body
     
    if(idade  < 0.2){
        return res.status(400).json({
            success:false,
            message: `O campo ${idade} deve ser maior que 0.2`
        })
    }
        
    if(peso <= 0){
        return res.status(400).json({
            success: false,
            message: `O campo ${peso} deve ser maior que 0` 
        })
    }

    if (!nome){
        return res.status(400).json({
            success: false,
            message: `O campo ${nome} é obrigatório`
        })
    }

    if(!especie){
        return res.status(400).json({
            success: false,
            message: `O campo ${especie} é obrigatório para um pet` 
        })
    }
    if(!raca){
        return res.status(400).json({
            success: false,
            message: `O campo ${raca} é obrigatório para um pet` 
        })
    }
    const novoPet = {
        id: pets.length + 1,
        nome: nome,
        idade,
        especie,
        raca,
        peso,
        idade,
        disponivel
    }
    
    pets.push(novoPet);

    res.status(200).json({
        success: true,
        message: `Novo pet criado com sucesso`,
        data: novoPet
    })
}

export  { getAllPets, getPetsById, createPet }