const UsuarioModel = require('../models/usuarioModel');
const CategoriaModel = require('../models/categoriaModel');

const bcrypt = require('bcrypt'); //para el hash de las contraseñas
const rondas = 10; //cantidad de veces que se aplica 

const usuarioModel = new UsuarioModel();
const categoriaModel = new CategoriaModel();

class ManejoUsuarioController {

    //MIDDLEWARE
    mostrarFormulario (req, res) { //cuando quiero devolver templates, utilizo res.render. Las plantillas son para mostrarle una pagina web al usuario
        console.log(req.session);
        res.render('panel/login', {
        });
    }

    async listarUsuarios (req,res) {
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

    async editarUsuario(req, res) {  //dice q vamos a obtener el usuario con el id correspondiente
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
            if (datos.id == 0 || datos.password){
                const hashedPassword = await bcrypt.hash(datos.password, rondas);
                datos.password = hashedPassword; //asigna la contraseña con el hash
            }
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