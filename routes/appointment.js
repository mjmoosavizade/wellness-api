const express = require('express');
const router = express.Router();
const appointmentController = require("../controllers/appointments");
const checkAuth = require('../middleware/chcek-auth');


router.get(`/`, checkAuth, appointmentController.getAllAppointments);

router.get(`/:id`, checkAuth, appointmentController.getOneAppointment);

router.post(`/`, checkAuth, appointmentController.makeAppoinment);

router.delete('/:id', checkAuth, appointmentController.deleteAppointment);

router.put('/:id', checkAuth, appointmentController.updateAppointment);

module.exports = router;