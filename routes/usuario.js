const express = require('express');
const router = express.Router(); //permite crear diferentes tipos de rutas para después exportarlas

const UsuarioModel = require('../models/usuarioModel');
const usuarioModel= new UsuarioModel();//new usuario model es una clase y está instanciada en la variable usuarioModel

router.get('/usuario', (req,res) => { //va a decir, "voy a crear un nuevo template y a partir de este nuevo template voy a listar todos los usuarios que yo ya tenga"
    usuarioModel.listar( (users) => {
        res.render("usuario/listado", {
            usuario: users
        }); //esta función se va a encargar de hacer la lógica
    });
});

module.exports = router; //estamos diciendo "vamos a exportar el modulo router". Este modulo es el de la linea 2 y tiene las 3 rutas recien generadas.
