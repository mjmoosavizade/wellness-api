const express = require('express');
const router = express.Router();
const quizResultsController = require('../controllers/quizResults');

router.post('/', quizResultsController.createResult);

router.get('/', quizResultsController.getResults);

router.get('/:user', quizResultsController.getUserResults);

module.exports = router;