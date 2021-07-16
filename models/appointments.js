const mongoose = require('mongoose');

const length = [0.5, 1, 1.5, 2];

const AppointmentSchema = mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    length: { type: String, required: true, enum: length },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    dateCreated: { type: Date, default: Date.now }
});

exports.Appointment = mongoose.model('Appointment', AppointmentSchema);