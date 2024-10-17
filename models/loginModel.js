//loginModel.js

const conx = require('../database/db'); //conexión a la bd.
const bcrypt = require('bcrypt');
const rondas = 10; //cantidad de veces que se aplica el hash

class LoginModel{

    actualizarPasswordHash(callback){
        const sql = "SELECT id, password FROM usuarios WHERE LENGTH(password) < 60"; 
        conx.query(sql, (err, results) => {
            if (err) {
                return callback(err, null); 
            }
            results.forEach((usuario) => { //acá recorre
                const hashPass = bcrypt.hashSync(usuario.password, rondas); // Encripta contraseña

                const sqlActualizar = "UPDATE usuarios SET password = ? WHERE id = ?";
                conx.query(sqlActualizar, [hashPass, usuario.id], (err, result) => {
                    if (err) {
                        console.log(`Error actualizando la contraseña del usuario ID ${usuario.id}: `, err);
                    } else {
                        console.log(`Contraseña del usuario ID ${usuario.id} actualizada correctamente.`);
                    }
                });
            });
        });
    }

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