//loginModel.js

const conx = require('../database/db'); //conexión a la bd.
const bcrypt = require('bcrypt');

class LoginModel{

    validarUsuario(email, password, callback) {
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        conx.query(sql, [email], (err, results) => {
            if (err) {
                return callback(err, null); 
            }
            if (results.length === 0) {
                return callback(null, false);
            }
            
            const usuario = results[0];

            const equalPassword = bcrypt.compareSync(password, usuario.password);
            if(equalPassword){
                callback(null, usuario); //el usuario es correcto
            } else{
                callback(null, false);
            }
        });
    }
}

module.exports = LoginModel;