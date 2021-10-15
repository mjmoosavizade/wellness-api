const mongoose = require('mongoose');

const notifSchema = mongoose.Schema({
    endpoint: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: String, required: true }
});

exports.NotifSchema = mongoose.model('Notif', notifSchema);