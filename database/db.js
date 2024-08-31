//este archivo se encarga de tener las conexiones a las bases de datos
//podemos usar estas conexiones incluyendo este archivo en los lugares donde queramos hacer los elementos
const mysql = require('mysql');

const conx = mysql.createConnection({ //permite crear una nueva conexión de mysql. Para esto hay que pasarle configuraciones
    host: 'localhost' , //donde está alojada la base de datos
    user: 'root', //usuario de la base
    password: '',// contraseña de la base
    database: 'centromedico' // es la base de datos
}); 

conx.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = conx;