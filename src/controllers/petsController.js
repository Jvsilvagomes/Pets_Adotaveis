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

export  { getAllPets, getPetsById }