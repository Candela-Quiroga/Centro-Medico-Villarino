const UsuarioModel = require('../models/usuarioModel');
const CategoriaModel = require('../models/categoriaModel');
const usuarioModel = new UsuarioModel();
const categoriaModel = new CategoriaModel();

class UsuarioController {

    async listarUsuarios (req,res) {
        usuarioModel.listar((users) => {
            console.log("Usuarios:", users); // Verifica qué datos se están obteniendo
            res.render("usuarios/listado", {
                usuarios: users
            }); //esta función se va a encargar de hacer la lógica
        });
    }

    async editarUsuario(req, res) { 
        const id = req.params.id; //una vez que está el usuario, hay que llamar al modelo. El nombre de este comodín se llama id, por eso usamos req.params.id
        usuarioModel.obtenerUsuario(id, (user) => {
            
            categoriaModel.listar((categories) => { //aca llamamos la categoria
                if(user === false){
                    //el usuario no existe. ESTO DESPUES SE MODIFICA
                } else {
                    //significa que el usuario existe
                    res.render('usuarios/editarUsuario', {
                        //hacemos un objeto que diga:
                        usuario: user,
                        categorias: categories
                    })
                }
            });

        })
    }

    async guardarUsuario(req,res){
        const datos = req.body;
        usuarioModel.guardar(datos);
        res.send({
            "success": true,
        })
    }

}

module.exports = UsuarioController;