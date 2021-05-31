const mongoose = require('mongoose');

const userRole = ['admin', 'user', 'specialist', ]
const gender = ['MALE', 'FEMALE', 'OTHER', ]

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    email: { type: String, required: false, },
    passwordHash: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^(\+98|0098|98|0)?9\d{9}$/,
    },
    userType: { type: String, enum: userRole, default: 'user' },
    gender: { type: String, enum: gender },

});

exports.User = mongoose.model('User', UserSchema);