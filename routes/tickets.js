const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/tickets');

router.get('/', ticketController.getAllTickets);

router.get('/:id', ticketController.getOneTickets);

router.post('/', ticketController.createTicket);

router.patch('/:id', ticketController.updateTicket);

router.post('/message', ticketController.sendMessage);

module.exports = router;