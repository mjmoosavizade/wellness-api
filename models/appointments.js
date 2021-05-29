const mongoose = require('mongoose');

const length = ['full', 'half'];

const AppointmentSchema = mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    length: { type: String, required: true, enum: length },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreated: { type: Date, default: Date.now }
});

exports.Appointment = mongoose.model('Appointment', AppointmentSchema);