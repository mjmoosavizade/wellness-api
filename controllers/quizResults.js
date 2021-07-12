const { QuizResult } = require('../models/quizResults');
const { QuizQuestion } = require('../models/quizQuestions');

exports.createResult = (req, res) => {
    QuizQuestion.find({ quiz: req.body.quiz })
        .exec()
        .then(questionResults => {
            let score = 0;
            questionResults.forEach((element, index) => {
                score += element.questionWeight * req.body.answers[index]
            });
            createObj = {
                quiz: req.body.quiz,
                user: req.body.user,
                answers: req.body.answers,
                score: score / 10,
            }
            const quizResult = new QuizResult(createObj);
            quizResult.save().then(result => {
                    res.status(201).json({ message: 'success', data: result })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err,
                        success: false
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
};

exports.getResults = (req, res) => {
    QuizResult.find()
        .populate('user', '-__v -passwordHash')
        .populate('quiz')
        .then(results => {
            if (results < 1) {
                res.status(404).json({ success: false, message: 'No Content' });
            } else {
                res.status(200).json({ success: true, data: results });
            }
        }).catch(err => {
            res.status(500).json({ success: false, error: results });
        })

};

exports.getUserResults = (req, res) => {
    QuizResult.find({ user: req.params.user })
        .populate('quiz')
        .then(results => {
            if (results < 1) {
                res.status(404).json({ success: false, message: 'No Content' });
            } else {
                res.status(200).json({ success: true, data: results });
            }
        }).catch(err => {
            res.status(500).json({ success: false, error: results });
        })
};