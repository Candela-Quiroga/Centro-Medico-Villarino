//manejoUsuariosController.js
//acá va todo lo relacionado con el ABML 

const UsuarioModel = require('../models/usuarioModel');
const CategoriaModel = require('../models/categoriaModel');

const bcrypt = require('bcrypt'); //para el hash de las contraseñas
const rondas = 10; //cantidad de veces que se aplica 

const usuarioModel = new UsuarioModel();
const categoriaModel = new CategoriaModel();

class ManejoUsuarioController {
    async listarUsuarios (req,res) { //MUESTRA
        usuarioModel.listar((users) => {
            console.log("Usuarios:", users);
            res.render("medicos/listarMedicos", {
                users: users
            });
        });
    }

    async crearUsuario (req, res){
        try {
            const categorias = await categoriaModel.listar(); 
            const usuario = await usuarioModel.obtenerUsuarioBase(); 
            res.render("usuarios/crearUsuario", {
                usuario: {id: 0}, 
                categorias: categorias, 
            });
        } catch (err){
            console.error("Error al crear el usuario: ", err);
            res.status(500).send("Error al crear el usuario");
        }
    }

    async editarUsuario(req, res) {  
        const datos = req.body.id;
        try{
            const usuario = await new Promise((resolve, reject) => {
                usuarioModel.obtenerUsuarios(id, (usuario) => {
                    if(usuario) {
                        resolve(usuario);
                    } else {
                        reject(new Error('No se encontró el usuario'));
                    }
                });
            });
            const usuarios = usuarioModel.obtenerUsuarios(id); 
            const categorias = categoriaModel.listar(); 
            if (datos.password) {
            const hashedPassword = await bcrypt.hash(datos.password, rondas);
            datos.password = hashedPassword; 
            }
            res.render('usuarios/editarUsuario', { 
                usuario: usuario,
                categorias: categorias,
                message: "Usuario actualizado con éxito."
            });
        } catch (err) {
            console.error("Error al cargar el usuario: ", err);
            res.status(500).send("Error al cargar el usuario.");
        }
    }
    async guardarUsuario(req,res) { 
        const datos = req.body; 
        if (!datos.password) {
            return res.status(500).json({
                success: false,
                message: "La contraseña es obligatoria."
            });
        }
        const hashedPassword = await bcrypt.hash(datos.password, rondas); //Hashear la contraseña
        datos.password = hashedPassword;
        usuarioModel.crear(datos, (result) => {
            if(!result) {
                return res.status(500).json({
                    success: false,
                    message: "Error al guardar el usuario"
                })
            }
            res.status(200).json({
                success: true,
                message: "El usuario se creó correctamente"
            })
        });
        usuarioModel.actualizar(datos, (result) => {
            if(result){
                return res.status(200).send("Guardado correctamente");
            }
        });
    }
    async eliminarUsuario (req, res) {
        const id = req.params.id;
        usuarioModel.eliminar(id, (result) => {
            if(!result){
                return res.status(500).send("Error al eliminar el usuario");
            } 
            res.redirect('/usuarios');
        });
    }
}
module.exports = ManejoUsuarioController;