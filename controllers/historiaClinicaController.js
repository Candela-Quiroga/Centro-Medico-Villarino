const HistoriaClinicaModel = require('../models/historiaClinicaModel');
const historiaClinicaModel = new HistoriaClinicaModel();
const PacienteModel = require('../models/pacienteModel');
const pacienteModel = new PacienteModel();
const CiudadesModel = require('../models/ciudadesModel');
const ciudadesModel = new CiudadesModel();
const PDFDocument = require('pdfkit');




class HistoriaClinicaController {

    //funcion para listar los historiaClinicas
    async listarHistoriaClinica (req, res) {

        const { buscar } = req.query; // Obtiene el valor del query y lo almacena en buscar
        let filtro = ''; // Almacena las palabra que usamos para filtrar
        
        if (buscar) {
            filtro = `
                WHERE historia_clinica.id LIKE '%${buscar}%' 
                OR historia_clinica.nro_afiliado LIKE '%${buscar}%' 
            `;
        }

        historiaClinicaModel.listarHistoriaClinica((historiaClinica) => {
            if (!historiaClinica || historiaClinica.length === 0) {
                console.log("No se encontraron historias clinicas.");
            } else {
                console.log(historiaClinica);
            }
            res.render("../views/historia_clinica/listarHistoriaClinica", {historiaClinica: historiaClinica}); //Antes no me funcionaba por no pasar la variable historiaClinicas como parametro en el render
        });
    };

    //funcion para editar los historiaClinicas
    async editarHistoriaClinica(req, res) {
            const id = req.params.id;
            historiaClinicaModel.obtenerHistoriaClinica(id, (historiaClinica)=>{

            // Para obtener los pacientes
            Promise.all([
                new Promise((resolve, reject) => {
                    pacienteModel.listarPacientes((pacientes) => {
                        resolve(pacientes);
                    });
                }),
                new Promise((resolve, reject) => {
                    ciudadesModel.listarCiudades((ciudades) => {
                        resolve(ciudades);
                    });
                }),
            ])
            .then(([pacientes, ciudades]) => {
                res.render("../views/historia_clinica/editarHistoriaClinica", {
                    historiaClinica: historiaClinica,
                    pacientes: pacientes,
                    ciudades: ciudades
                });
            })
            .catch(err => {
                console.error(err);
                res.status(500).send("Error al cargar la información");
            });
        });
    }
    
    //funcion para agregar historiaClinicas
    async guardarHistoriaClinica(req, res){
        const datos = req.body;
        console.log(datos);
        historiaClinicaModel.guardarHistoriaClinica(datos, (result)=>{
            res.send({
                "success": true,
            });
        });
    }

    // Función para mostrar el formulario de agregar historiaClinicas
    async AgregarHistoriaClinica(req, res) {
        //para obtener los médicos y pacientes
        Promise.all([
            new Promise((resolve, reject) => {
                pacienteModel.listarPacientes((pacientes) => {
                    resolve(pacientes);
                });
            }),
            new Promise((resolve, reject) => {
                ciudadesModel.listarCiudades((ciudades) => {
                    resolve(ciudades);
                });
            }),
        ])
        .then(([pacientes, ciudades]) => {
            res.render("../views/historia_clinica/agregarHistoriaClinica", {
                historiaClinica: { id: 0 },
                pacientes: pacientes,
                ciudades: ciudades
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al cargar la información");
        });
    }

    // Función para guardar un nuevo historiaClinica
    async guardarHistoriaClinica(req, res) {
        const datos = req.body; // Datos recibidos del formulario
        console.log(datos);
        try {
            await new Promise((resolve, reject) => {
                historiaClinicaModel.guardarHistoriaClinica(datos, (result) => {
                    if (!result) reject(new Error("Error al guardar la historia clinica"));
                    resolve(result);
                });
            });

            res.send({ success: true });
        } catch (error) {
            console.error("Error al guardar la historia clinica:", error);
            res.status(500).send({ success: false });
        }
    }

    //funcion para eliminar la historia clinica
    async eliminarHistoriaClinica(req, res) {
        const id = req.params.id;
        historiaClinicaModel.eliminarHistoriaClinica(id, (result) => {
            if (!result) {
                return res.status(500).send("Error al eliminar la historia clinica.");
            } else {
            res.redirect('/historiasclinicas'); // Redirige a la lista de historias clinicas tras eliminar
            }
        });
    }  
    
    async imprimirHistoriaClinica (req, res) {
        try {
            const historiaId = req.params.id;
            const historiaClinica = await new Promise((resolve, reject) => {
                historiaClinicaModel.obtenerHistoriaClinica(historiaId, (data) => {
                    if (!data) reject(new Error('Historia Clínica no encontrada'));
                    resolve(data);
                });
            });

            if (!historiaClinica) {
                return res.status(404).send('Historia Clínica no encontrada');
            }

            // Crear un nuevo documento PDF
            const doc = new PDFDocument();
            const filename = `Historia Clinica de ${historiaClinica.nombre_paciente}.pdf`;
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            // Definir el contenido del PDF
            doc.fontSize(20).text('Historia Clínica', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Código: ${historiaClinica.id}`);
            doc.text(`Fecha: ${new Date(historiaClinica.fecha).toLocaleDateString()}`);
            doc.text(`Paciente: ${historiaClinica.nombre_paciente}`);
            doc.text(`Número de Afiliado: ${historiaClinica.nro_afiliado}`);
            doc.text(`Sexo: ${historiaClinica.sexo}`);
            doc.text(`Fecha de Nacimiento: ${new Date(historiaClinica.fecha_de_nacimiento).toLocaleDateString()}`);
            doc.text(`Edad: ${historiaClinica.edad}`);
            doc.text(`Motivo: ${historiaClinica.motivo}`);
            doc.text(`Antecedentes Personales: ${historiaClinica.antecedentes_personales}`);
            doc.text(`Medicación Actual: ${historiaClinica.medicacion_actual}`);
            doc.text(`Examen Clínico: ${historiaClinica.examen_clinico}`);
            doc.text(`Diagnóstico: ${historiaClinica.diagnostico}`);
            doc.text(`Tratamiento: ${historiaClinica.tratamiento}`);
            doc.text(`Domicilio: ${historiaClinica.direccion}`);
            doc.text(`Ciudad: ${historiaClinica.nombre_ciudad}`);

            // Finalizar el PDF
            doc.end();
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            res.status(500).send('Error al generar el PDF');
        }
    }
}
//exporto el controller con la funcion de listar
module.exports = HistoriaClinicaController;