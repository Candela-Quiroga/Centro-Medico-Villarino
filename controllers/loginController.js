//loginController.js
//acá va todo lo relacionado con el inicio de sesión

const UsuarioModel = require('../models/usuarioModel');
const usuarioModel = new UsuarioModel();

const bcrypt = require('bcrypt'); //para hashear las contraseñas al guardarlas  y despues compararlas en la validación

class loginController {
    async mostrarFormulario (req, res) { 
        console.log(req.session);
        res.render('panel/login');
    }

    async validarFormulario(req, res){
        const email = req.body.email; 
        const password = req.body.password; 
        const usuario = await usuarioModel.validarUsuario(email, password);

        if(usuario && bcrypt.compareSync(password, usuario.password)) {
            //usuario valido
            req.session.idUsuario = usuario.id; //guarda el id del usuario en la sesión
            res.json({
                "idUsuario": usuario.id,
                "error": 0 //login correcto
            });
        }else{
            //no hay usuario
            res.json({
                "error": 1, //error en el usuario o la contraseña
            });
        }
    }
}

module.exports = loginController;