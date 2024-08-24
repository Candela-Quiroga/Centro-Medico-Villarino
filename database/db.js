const mysql = require('mysql');

const conx = mysql.createConnection({ //permite crear una nueva conexión de mysql. Para esto hay que pasarle configuraciones
    host: 'localhost' , //donde está alojada la base de datos
    user: 'root', //usuario de la base
    password: '',// contraseña de la base
    database: 'centro_medico' // es la base de datos
}); 

module.exports = conx;