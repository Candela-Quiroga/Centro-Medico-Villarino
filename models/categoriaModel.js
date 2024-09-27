//categoriaModel.js
const conx= require('../database/db');

class CategoriaModel {

    async listar(){
        return new Promise ((resolve, reject) => {
            let sql = "SELECT * FROM categoria_permiso";
            conx.query(sql, [], async(err,results) => {
                if(err) {
                    console.error("Error al obtener categoria", err);
                    reject(err);
                } else{
                    resolve(results);
                }
            });
        });
    }
    
};

module.exports = CategoriaModel;