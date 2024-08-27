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

    async editarUsuario(req, res) {  //dice q vamos a obtener el usuario ocn el id correspondiente
        const id = req.params.id; //una vez que está el usuario, hay que llamar al modelo. El nombre de este comodín se llama id, por eso usamos req.params.id
        usuarioModel.obtenerUsuario(id, (user) => {
            
            categoriaModel.listar((categories) => { //aca llamamos la categoria
                if(user === false){ //si el usuario es falso, trabajamos con un usuario base (para poder seguir utilizando el script de actualizar pero con los datos vacios, entonces la prox q se quiera crear un usuario, se hace de una base vacia)
                    //el usuario no existe. 
                    user = usuarioModel.obtenerUsuarioBase(); //permite devolverle un objeto basico al usuario
                } 
                res.render('usuarios/editarUsuario', {
                    //hacemos un objeto que diga:
                    usuario: user,
                    categorias: categories
                })
            });

        })
    }

    async guardarUsuario(req,res) {
        const datos = req.body;
        usuarioModel.guardar(datos, () => {
            res.send({
                "success": true, //me permite saber cuando terminó la ejecución de la base de datos. 
            });
        }); //si no trabajamos con el callback no sabemos cuando terminó
    }

    async eliminarUsuario (req, res) {
        const id = req.params.id;
        usuarioModel.eliminar(id, () => {
            res.send({
                "success": true,
            })
        });
    }

}

module.exports = UsuarioController;