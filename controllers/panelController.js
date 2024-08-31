const conx = require('../database/db');

class PanelController {
    mostrarListado(req, res) {
        const sql = "SELECT * FROM usuarios"; 

        conx.query(sql, [], (err, results) => {

            if (err) {
                console.error("Error al obtener usuarios:", err);
                return res.status(500).send("Error al obtener usuarios");
            }

            console.log("Usuarios obtenidos:", results);

            res.render('panel/listado', { usuarios: results });
        });
    }
}

module.exports = PanelController;