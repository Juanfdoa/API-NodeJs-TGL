const Joi = require('joi');
const appointmentService = require('../services/appointment')
const { createAppointmentSchema }= require('../schema/appointment')

const getAppointments = async (req, res) => {
    try {
        const appointment = await appointmentService.getAppointments()
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAppointment = async (req, res) => {
    try {
        const { error } = createAppointmentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, age, gender, owner, appointment_date, hour} = req.body;
        const appointment = await appointmentService.insertAppointment(name, age,gender, owner, appointment_date, hour)
        if (!appointment) {
            res.status(404).json({ error: 'Bad request' });
        }
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required()
        });

        const { error } = schema.validate({ id: req.params.id });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const id = req.params.id;
        const appointmentDeleted = await appointmentService.deleteAppointmentById(id);

        if (!appointmentDeleted) {
            return res.status(404).json({ error: 'Appointment was not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAppointments,
    createAppointment,
    deleteAppointment
}