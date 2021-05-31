const express = require('express');
const router = express.Router();
const quizResultsController = require('../controllers/quizResults');

router.post('/', checkAuth, quizResultsController.createResult);

router.get('/', checkAuth, quizResultsController.getResults);

router.get('/:user', checkAuth, quizResultsController.getUserResults);

module.exports = router;