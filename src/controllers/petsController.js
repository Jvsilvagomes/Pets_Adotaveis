import dados from "../models/dados.js";

const { pets } = dados;
let resultado = pets;

const getAllPets = (req,res) =>{
    
    res.status(200).json({
        total: resultado.lenth,
        data: resultado
    });
}

export  { getAllPets }