const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');
const isAutheticated = require('../middleware/authValidation')

router.use(isAutheticated);

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.delete('/:id', appointmentController.deleteAppointment);



module.exports = router