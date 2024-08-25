const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = new UsuarioModel();

class UsuarioController {
    async listarUsuarios (req,res) {
        usuarioModel.listar((users) => {
            res.render("usuarios/listado", {
                usuarios: users
            }); //esta función se va a encargar de hacer la lógica
        });
    }

    async editarUsuario(req, res) { 
        const id = req.params.id; //una vez que está el usuario, hay que llamar al modelo
        usuarioModel.obtenerUsuario(id, (user) => {
            if(user === false){
                //el usuario no existe
            } else {
                //significa que el usuario existe
                res.render('usuarios/editarUsuario', {
                    //hacemos un objeto que diga:
                    usuario: user
                })
            }
        })
    }
}

module.exports = UsuarioController;