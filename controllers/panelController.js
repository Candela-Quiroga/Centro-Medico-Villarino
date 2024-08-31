//no queremos que tenga ningun modelo, solo queremos q llame a una pantalla

class mostrarListado (req, res) {
    res.render('panel/listado'); //acá nos tiene que llevar la ruta
}

module.exports = PanelController;