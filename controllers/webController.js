const MedicoModel = require('../models/medicoModel');
const medicoModel = new MedicoModel();

const PacienteModel = require('../models/PacienteModel');
const pacienteModel = new PacienteModel();


class WebController{

    //Mostrar homepage
    async mostrarHome(req,res){
        medicoModel.listarMedicos((medicos) => {
            res.render('web/home', {
                title: 'Centro Médico Villarino - Home',
                medicos: medicos // Pasamos los médicos a la vista
            });
            
        })
        
    }

    //Mostrar pagina nosotros
    mostrarNosotros(req,res){
        res.render('web/nosotros', {title: 'Sobre Nosotros'});
    }

    //Mostrar pagina profesionales
    mostrarProfesionales(req,res){
        medicoModel.listarMedicos((medicos) =>{
            res.render('web/profesionales', {
                title: 'Profesionales',
                medicos: medicos
            });
        })
        
    }

    //Mostrar pagina coberturas

    async mostrarCoberturas(req, res) {
        try {
            // Llamar a listarMedicos y obtenerObrasSociales en paralelo
            medicoModel.listarMedicos((medicos) => {
                pacienteModel.obtenerObrasSociales((obrasSociales) => {
                    // Renderizar la vista de coberturas, pasando los médicos y las obras sociales
                    res.render('web/coberturas', {
                        title: 'Coberturas Médicas',
                        medicos: medicos,
                        obrasSociales: obrasSociales
                    });
                });
            });

        } catch (error) {
            console.error('Error al obtener datos para la página de coberturas:', error);
            res.status(500).send('Error al cargar la página de coberturas');
        }
    }



    //Mostrar pagina contacto
    mostrarContacto(req,res){
        res.render('web/contacto', {title: 'Contacto'});
    }

    //Mostrar pagina "Pedir Turno"
    // Mostrar página "Pedir Turno"
    // Mostrar página "Pedir Turno"
    // Mostrar página "Pedir Turno"
    async mostrarPedirTurno(req, res) {
        try {
            // Llamar a listarMedicos
            medicoModel.listarMedicos((medicos) => {
                // Llamar a obtenerObrasSociales
                pacienteModel.obtenerObrasSociales((obrasSociales) => {
                    // Llamar a listarEspecialidades
                    medicoModel.listarEspecialidades()
                        .then((especialidades) => {
                            // Renderizar la vista de pedir turno, pasando los médicos, las obras sociales y las especialidades
                            res.render('web/pedirTurno', {
                                title: 'Pedir Turno',
                                medicos: medicos,
                                obrasSociales: obrasSociales,
                                especialidades: especialidades
                            });
                        })
                        .catch((especialidadesError) => {
                            console.error('Error al obtener especialidades:', especialidadesError);
                            res.status(500).send('Error al cargar especialidades');
                        });
                });
            });
        } catch (error) {
            console.error('Error al obtener datos para la página de pedir turno:', error);
            res.status(500).send('Error al cargar la página de pedir turno');
        }
    }





}

module.exports = WebController;