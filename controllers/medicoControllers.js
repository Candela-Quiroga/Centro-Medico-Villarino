//AGREGAREMOS LOS COMENTARIOS DE TODO EN CADA LINEA UNA VEZ NOS FUNCIONE EL ABML

const express = require ('express');

const Medico = require('../models/medicoModel');

exports.getAllMedicos = (req, res) => {
    Medico.getAll((err, results) => {
        if (err) {
            return res.status(500).send('Error al obtener los médicos');
        }
        res.render('medicos/listar', { usuarios });
    });
};

exports.getMedicoById = (req, res) => {
    const { id } = req.params;
    Medico.getById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
};

exports.createMedico = (req, res) => {
    const data = req.body;
    Medico.create(data, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
};

exports.updateMedico = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Medico.update(id, data, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Médico actualizado con éxito' });
    });
};

exports.deleteMedico = (req, res) => {
    const { id } = req.params;
    Medico.delete(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Médico eliminado con éxito' });
    });
};


medicoController; //es para exportar el modulo.