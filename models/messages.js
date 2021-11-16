const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now, }
});


exports.Message = mongoose.model('Messages', messageSchema);