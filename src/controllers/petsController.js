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

const deletePet = (req,res) => {
    const { id } = req.params

    if (isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido!"
        });
    }

    const idParaApagar = parseInt(id);

    const petParaRemover  = pets.find(p => p.id === idParaApagar);
    //console.log(petParaRemover)

    if (!petParaRemover){
        return res.status(404).json({
            success: false,
            message: "pet id não existe"
        });
    }

    const petFiltrado = pets.filter(p => p.id !== id);
    //console.log(petFiltrado)

    pets.splice(0, pets.length, ...petFiltrado)

    return res.status(200).json({
        success: true,
        message: "Pet apagado com sucesso!"
    })
}

const updatePet = (req, res) => {
    const id = parseInt(req.params.id);
     const { nome, especie, raca, idade, peso, disponivel } = req.body

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const petExiste = pets.find(p => p.id === id);

    if (!petExiste) {
        return res.status(404).json({
            success: false,
            message: "pet não existe"
        });
    }

    //Regras de negocio
    if (idade < 0.2){
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior a 0.2"
        })
    }

    const petsAtualizados = pets.map(pet =>
        pet.id === id
            ? {
                ...pet,
                ...(nome && { nome }),
                ...(idade && { idade }),
                ...(especie && { especie }),
                ...(raca && { raca }),
                ...(peso && { serie }),
                ...(disponivel && { disponivel })
            }
            : pet
    );

    pets.splice(0, pets.length, ...petsAtualizados);

    const petAtualizado = pets.find(p => p.id === id);

    res.status(200).json({
        success: true,
        message: "pets atualizado com sucesso",
        monstro: petAtualizado
    })

}

const adotarPet = (req, res) => {
    const { id } = req.params;
    const pet = dados.find(p => p.id == id);

    if (!pet) {
        return res.status(404).json({ erro: "Pet não encontrado." });
    }

    if (!pet.disponivel) {
        return res.status(400).json({ erro: "Este pet já foi adotado." });
    }

    pet.disponivel = false;
    return res.json({ mensagem: `Parabéns! Você adotou o ${pet.nome}.`, pet });
}

export  { getAllPets, getPetsById, createPet, deletePet, updatePet, adotarPet}