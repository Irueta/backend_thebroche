import gruposModel from "../../models/gruposModel.js";
import {Op} from "sequelize";


const getAll = async(q=null) => {
    
    /* const options = {};
    if(q) {
        options.where = { nombre:"Admin",}
    } */
    try{
        const grupos = await gruposModel.findAll();
        return grupos;
    }catch(e){
        return [e.message,null];
    }; 
}

const getById = async (id) => {
    try {
        const grupos = await gruposModel.findByPk(id);
        return grupos;
    }
    catch (e) {
        return [e.message, null];
    }
}

const create = async (tipo, peso) => {
    if (tipo === undefined || peso === undefined) {
        const error = "Tipo y peso deben ser definidos";
        return [error, null];
    }
    try {
        const aceituna = await aceitunasModel.create({tipo,peso});
        return [null, aceituna];
    }
    catch (e) {
        return [e.message, null];
    }
}

const update = async(id,tipo,peso) => {
    
    if(id == undefined){
        const error = "Tienes que especificar un ID válido";
        return [error,null];
    }
    if (tipo === undefined || peso === undefined) {
        const error = "Tipo y peso deben ser definidos";
        return [error, null];
    }
    if (peso < 0 || peso > 255){
        const error = "El peso debe estar entre 0 y 255 (incluidos)";
        return [error,null];
    }
    try {
        console.log("id",id);
        const aceituna= await aceitunasModel.findByPk(id);
        aceituna.tipo = tipo;
        aceituna.peso = peso;
        aceituna.save();
        return [null,aceituna];
    }
    catch (e) {
        console.log(e)
        return [e.message,null];
    }
};

const remove = async (id) => {
    try {
        const aceituna = await aceitunasModel.findByPk(id);
        if(!aceituna){
            const error = "No se ha encontrado ningún elemento con ese ID";
            return[error,null];
        }
        aceituna.destroy();
        return [null,aceituna];
    }
    catch (e) {
        return [e.message,null];
    }
}


export default {
    getAll,
    getById,
    create,
    update,
    remove
};
