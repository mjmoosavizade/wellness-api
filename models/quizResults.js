const mongoose = require('mongoose');

const quizResult = mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    created_at: { type: Date, default: Date.now, }
});


exports.QuizResult = mongoose.model('QuizResult', quizResult);