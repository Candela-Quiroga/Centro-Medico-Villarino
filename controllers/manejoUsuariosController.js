const UsuarioModel = require('../models/usuarioModel');
const CategoriaModel = require('../models/categoriaModel');

const usuarioModel = new UsuarioModel();
const categoriaModel = new CategoriaModel();

class ManejoUsuarioController {

    //MIDDLEWARE
    mostrarFormulario (req, res) { //cuando quiero devolver templates, utilizo res.render. Las plantillas son para mostrarle una pagina web al usuario
        console.log(req.session);
        res.render('panel/login', {
        });
    }

    //Mostrar homepage
    homepage(req,res){
        res.render('usuarios/home', {
        });
    }

    //Mostrar pagina nosotros
    mostrarnosotros(req,res){
        res.render('usuarios/nosotros', {
        });
    }

    async listarUsuarios (req,res) {
        usuarioModel.listar((users) => {
            if (users.length === 0){ //acá, en el caso de que no haya usuarios, va a mostrar un cartel que diga lo que dice el alert
                alert("No se encontraron usuarios.");
            }
            console.log("Usuarios:", users); // Verifica qué datos se están obteniendo
            res.render("panel/listado", {
                usuarios: users
            }); //esta función se va a encargar de hacer la lógica
        });
    }

    async editarUsuario(req, res) {  //dice q vamos a obtener el usuario ocn el id correspondiente
        const id = req.params.id; // toma el id del usuario //una vez que está el usuario, hay que llamar al modelo. El nombre de este comodín se llama id, por eso usamos req.params.id
        try {
            const user = await usuarioModel.obtenerUsuario(id);
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
            await usuarioModel.guardar(datos);
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
            req.status(500).send({
                success: false,
                message: "Error al eliminar el usuario.",
            });
        }
    }

}

module.exports = ManejoUsuarioController;