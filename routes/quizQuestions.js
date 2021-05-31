const express = require('express');
const router = express.Router();
const quizQuestionsController = require('../controllers/quizQuestions');

router.post('/', quizQuestionsController.createQuiestion);

router.get('/', quizQuestionsController.getAllQuestions);

router.get('/:id', quizQuestionsController.getOneQuestion);

router.delete('/:id', quizQuestionsController.deleteQuestion);

router.patch('/:id', quizQuestionsController.updateQuestion);

module.exports = router;