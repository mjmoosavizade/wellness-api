const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizzes');
const checkAuth = require('../middleware/chcek-auth');


router.post('/', checkAuth, quizController.createQuiz);

router.get('/', checkAuth, quizController.getAllCategories);

router.get('/:id', checkAuth, quizController.getOneCategories);

router.patch('/:id', checkAuth, quizController.updateQuiz);

module.exports = router;