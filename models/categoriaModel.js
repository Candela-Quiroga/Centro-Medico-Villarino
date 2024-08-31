const conx= require('../database/db');

class CategoriaModel {

    async listar(callback){
        let sql = "SELECT * FROM categoria_permiso";

        conx.query(sql, [], async(err,results) => {
            callback(results);
        });

    }
};

module.exports = CategoriaModel;
const conx= require('../database/db');

class CategoriaModel {

    async listar(callback){
        let sql = "SELECT * FROM categoria_permiso";

        conx.query(sql, [], async(err,results) => {
            callback(results);
        });

    }
};

module.exports = CategoriaModel;