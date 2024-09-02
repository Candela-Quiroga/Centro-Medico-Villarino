const conx = require('../database/db'); // Importo la db

exports.guardar = (req, res) => {
    console.log(req.body); // Para ver qué datos están llegando
    const medico = req.body.medico; // Guardo los req con los datos del body que me devuelve: nombre, tel, especialidad y ID
    const telefono = req.body.telefono;
    const id_especialidad = req.body.especialidad;
    const id_usuario = req.body.id_usuario;

    
    const query = 'INSERT INTO medicos (id_usuario, id_especialidad, telefono) VALUES (?, ?, ?)'; // Hago la consulta a la db
    conx.query(query, [id_usuario, id_especialidad, telefono], (error, results) => {
        if (error) {
            console.log('Error al guardar el médico: ', error); // Mensaje de error del servidor
            res.status(500).send('Error al guardar el médico'); //Imprimo el error por pantalla
        } else {
            res.redirect('/medicos/listar'); // En caso de no tener error vuelvo al ejs con la info actualizada
        }
    });

};

exports.editar = (req, res) => {
    console.log(req.body); // Para ver qué datos están llegando
    const id = req.body.id; // Guardo los req con los datos del body que me devuelve: nombre, tel, especialidad y ID
    const medico = req.body.medico;
    const telefono = req.body.telefono;
    const especialidad = req.body.especialidad;

    // Busca el id de la especialidad
    conx.query('SELECT id FROM especialidades WHERE nombre_especialidad = ?', [especialidad], (error, results) => { // Hago la consulta a la db
        if (error) {
            console.log('Error al editar la información: ', error); // Mensaje de error del servidor
            res.status(500).send('Error al editar la información'); //Imprimo el error por pantalla
        } else {
            const id_especialidad = results[0].id; // No recuerdo bien para qué era esto
            conx.query('UPDATE medicos SET nombre = ?, telefono = ?, id_especialidad = ? WHERE id = ?', [medico, telefono, id_especialidad, id], (error, results) => { // Hago la consulta a la db
                if (error) {
                    console.log('Error al editar la información: ', error); // Mensaje de error del servidor
                    res.status(500).send('Error al editar la información'); //Imprimo el error por pantalla
                } else {
                    res.redirect('/medicos/listar'); // En caso de no tener error vuelvo al ejs con la info actualizada
                }
            });
        }
    });
};
