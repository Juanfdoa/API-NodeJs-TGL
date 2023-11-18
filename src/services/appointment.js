const sequelize = require('../db/sequalize')
const Appointment = require('../db/models/Appointment')


async function getAppointments() {
    const appointment = await Appointment.findAll()
    return appointment
}

async function insertAppointment(name, age, gender, owner, appointment_date, hour) {
    try {
      await sequelize.sync();
      const newAppointment = await Appointment.create({
        name,
        age,
        gender,
        owner,
        appointment_date,
        hour
      });
      return newAppointment;
    } 
    catch (error) {
      console.error('There was an error: ', error);
    }
  }

  async function deleteAppointmentById(id) {
    try {
        const appointmentToDelete = await Appointment.findByPk(id);

        if (!appointmentToDelete) {
            return null; 
        }

        await appointmentToDelete.destroy();
        return appointmentToDelete; 
    } catch (error) {
        console.error('There was an error:', error);
        throw error; 
    }
}
  
module.exports = {
    getAppointments,
    insertAppointment,
    deleteAppointmentById
}
