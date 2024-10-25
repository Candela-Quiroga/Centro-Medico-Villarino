const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

const PacienteModel = require('../models/PacienteModel');
const pacienteModel = new PacienteModel();

const TurnoModel = require('../models/turnoModel');
const turnoModel = new TurnoModel();

class PanelAdminController {

    // Mostrar panel general
    mostrarPanelGeneral(req, res) {
    res.render('panel/panelAdmin', {

    })
    }

}

module.exports = PanelAdminController;
