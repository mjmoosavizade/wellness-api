const express = require('express');
const router = express.Router();
const appointmentController = require("../controllers/appointments");
const checkAuth = require('../middleware/chcek-auth');


router.get(`/`, appointmentController.getAllAppointments);

router.get(`/:id`, appointmentController.getOneAppointment);

router.post(`/`, appointmentController.makeAppoinment);

router.delete('/:id', checkAuth, appointmentController.deleteAppointment);

router.put('/:id', appointmentController.updateAppointment);

module.exports = router;