//loginController.js
//acá va todo lo relacionado con el inicio de sesión

const LoginModel = require('../models/loginModel');
const loginModel = new LoginModel();

const bcrypt = require('bcrypt');

class loginController {
    async mostrarFormulario (req, res) { 
        console.log(req.session);
        res.render('usuarios/login');
    }

    async validarFormulario(req, res){
        const email = req.body.email; 
        const password = req.body.password; 

        loginModel.validarUsuario(email, password, (err, usuario) => {
            if(err){
                return res.status(500).json({
                    success: false, 
                    message: "Error al validar el usuario." 
                });
            }
            if(usuario && bcrypt.compareSync(password, usuario.password)) { //si la contraseña ingresada y la del usuario coinciden
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
        });
    }
}

module.exports = loginController;