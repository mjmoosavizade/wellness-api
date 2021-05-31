const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizzes');


router.post('/', quizController.createQuiz);

router.get('/', quizController.getAllCategories);

router.get('/:id', quizController.getOneCategories);

router.patch('/:id', quizController.updateQuiz);

module.exports = router;