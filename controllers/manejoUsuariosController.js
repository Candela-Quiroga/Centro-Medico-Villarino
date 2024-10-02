//manejoUsuariosController.js
//acá va todo lo relacionado con el ABML 

const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = new UsuarioModel();

const bcrypt = require('bcrypt'); //para el hash de las contraseñas
const rondas = 10; //cantidad de veces que se aplica el hash

class ManejoUsuarioController {

    async listarUsuarios(req, res){
        usuarioModel.listar((err, usuarios) => {
            if (err) {
                console.error("Error al listar los usuarios:", err);
                return res.status(500).send("Error al listar los usuarios.");
            }
            res.render("usuarios/listado", {
                usuarios
            });
        });
    }

    async crearUsuario(req, res){
        try {
            const categoria = await usuarioModel.listarCategoria();
            const usuario = usuarioModel.obtenerUsuarioBase();
            res.render("usuarios/crearUsuario", {
                user: {id: 0},
                usuario: usuario,
                categorias: categoria
            });
        } catch (err) {
            console.error("Error creando el usuario: ", err);
            res.status(500).send("Error creando el usuario.");
        }
    }

    async editarUsuario(req, res){
        const id = req.params.id;
        try {
            const usuario = await new Promise((resolve, reject) => {
                usuarioModel.obtenerUsuarios(id, (err, usuario) => {
                    if (err || !usuario) {
                        return reject(new Error("No se encontró el usuario"));
                    }
                    resolve(usuario);
                });
            });
            console.log('Usuario obtenido:', usuario);

            const categoria = await usuarioModel.listarCategoria();

            res.render("usuarios/editarUsuario", {
                usuario: usuario,
                categorias: categoria
            });
        } catch (err) {
            console.error("Error cargando  el usuario:", err);
            res.status(500).send("Error cargando el usuario.");
        }
    }

    async guardarUsuario(req, res){
        const datos = req.body; 
        console.log(datos);
        if (!datos.nombre || !datos.email || !datos.password || !datos.categoria) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios."
            });
        }

        try {
            datos.password = await bcrypt.hash(datos.password, rondas); // Hashear la contraseña
            if (datos.id === undefined || datos.id == 0) {
                usuarioModel.crear(datos, (err, result) => {
                    if (err || !result) {
                        return res.status(500).json({ 
                            success: false, 
                            message: "Error al guardar el usuario." 
                        });
                    }
                    res.status(200).json({ 
                        success: true, 
                        message: "El usuario se creó correctamente." 
                    });
                });
            } else {
                usuarioModel.actualizar(datos, (result) => {
                    if (!result) {
                        return res.status(500).json({ 
                            success: false, 
                            message: "Error al actualizar el usuario." 
                        });
                    } else {
                        res.status(200).json({ 
                            success: true, 
                            message: "El usuario se actualizó correctamente." 
                        });
                    }   
                });
            }
        } catch (err) {
            console.error("Error al guardar el usuario: ", err);
            res.status(500).send("Error al guardar el usuario.");
        }
    }

    async eliminarUsuario(req, res) {
        const id = req.params.id;
        usuarioModel.eliminar(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar el usuario.");
            } else{
                res.redirect('/usuarios');
            }
        });
    }
}
module.exports = ManejoUsuarioController;