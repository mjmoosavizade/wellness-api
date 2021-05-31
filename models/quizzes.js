const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    quizCategory: { type: String, required: true, },
    quizDescription: { type: String, },
    active: { type: Boolean, default: false },
});


exports.Quiz = mongoose.model('Quiz', quizSchema);