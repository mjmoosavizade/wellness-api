const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
    endpoint: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    minute: { type: String, required: true },
    hour: { type: String, required: true }
});

exports.Notif = mongoose.model('Notif', notifSchema);