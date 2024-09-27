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
            if (users.length === 0){ //acá, en el caso de que no haya usuarios, va a mostrar una alerta
                alert("No se encontraron usuarios.");
            }
            console.log("Usuarios:", users); // Verifica qué datos se están obteniendo
            res.render("panel/listado", {
                usuarios: users
            }); 
        });
    }
    async editarUsuario(req, res) {  
        const id = req.params.id; // toma el id del usuario.
        try {
            let user = await usuarioModel.obtenerUsuarios(id);
            const categories = await categoriaModel.listar();
            if (!user){
                user = usuarioModel.obtenerUsuarioBase();
            }
            res.render('panel/editarUsuario', {
                usuario: user,
                categorias: categories, 
            });
        } catch (error) {
            console.error("Error al obtener usuario: ", error);
            res.status(500).send("Error al obtener usuario");
        }
    }
    async guardarUsuario(req,res) { 
        try{
            const datos = req.body; //toma todos los valores del formulario
            if (datos.id == 0 || datos.password){
                const hashedPassword = await bcrypt.hash(datos.password, rondas);
                datos.password = hashedPassword; //asigna la contraseña con el hash
            }
            if (datos.id == 0) { 
                await usuarioModel.guardar(datos);  //Esto es para crear
                res.status(200).json({
                    success: true,
                    message: "Usuario creado exitosamente."
                });
            } else { 
                await usuarioModel.actualizar(datos); //Esto es para para actualizar
                res.status(200).json({ // Cambié el estado a 200 para actualización exitosa
                    success: true,
                    message: "Usuario actualizado exitosamente."
                });
            }
            res.json({
                success: true,
            });
        } catch (error) {
            console.error("Error al guardar el usuario: ", error);
            res.status(500).json({
                success: false,
                message: "Error al guardar el usuario",
            });
        }
    }
    async eliminarUsuario (req, res) {
        const id = req.params.id;
        try {
            usuarioModel.eliminar(id, () => {
                res.send({
                    success: true,  
                });
            });
        } catch (error){
            console.error("Error al eliminar el usuario: ", error);
            res.status(500).send({
                success: false,
                message: "Error al eliminar el usuario.",
            });
        }
    }
}
module.exports = ManejoUsuarioController;