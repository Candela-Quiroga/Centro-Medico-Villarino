//panelController.js
//acá va el control del administrador

class PanelSecretariaController{

    //mostrar panel general
    mostrarPanelGeneral(req,res){
        res.render('panel/panelSecretarias', {title: 'Panel General'});
    }
}

module.exports = PanelSecretariaController;