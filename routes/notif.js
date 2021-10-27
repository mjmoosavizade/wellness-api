const express = require('express');
const router = express.Router();
const quizQuestionsController = require('../controllers/notif');
const checkAuth = require('../middleware/chcek-auth');

router.post('/', checkAuth, quizQuestionsController.createNotif);

router.get('/', checkAuth, quizQuestionsController.getMyNotifs);

router.delete('/', checkAuth, quizQuestionsController.deleteTicket);

module.exports = router;