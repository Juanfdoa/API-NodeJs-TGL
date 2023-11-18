const Joi = require('joi');

const createAppointmentSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().positive().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    owner: Joi.string().required(),
    appointment_date: Joi.date().iso().required(),
    hour: Joi.string().required()
});

module.exports = {
    createAppointmentSchema
}