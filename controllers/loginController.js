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
                req.session.categoria= usuario.id_categoriaPermiso;
                req.session.nombreUsuario = usuario.nombre; // guarda el nombre del usuario en la sesión
                req.session.emailUsuario = usuario.email; // guarda el email del usuario en la sesión

                console.log('Email guardado en sesión:', req.session.emailUsuario);  // Confirmación


                res.json({
                    "idUsuario": usuario.id,
                    "categoria": usuario.id_categoriaPermiso,
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

    actualizarPassword(req, res) { //acá les hago el hash
        loginModel.actualizarPasswordHash((err, mensaje) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error al actualizar las contraseñas.",
                    error: err
                });
            }
            res.json({
                success: true,
                message: mensaje
            });
        });
    }

    async logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: "Error al cerrar sesión"
                });
            }
            res.redirect('/login');
        });
    }

}

module.exports = loginController;