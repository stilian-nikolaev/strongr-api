const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true,
        default: 'Gym lover'
    }
})

module.exports = mongoose.model('User', userSchema);