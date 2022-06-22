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
    },
    avatarId: {
        type: Number,
        required: true,
        default: 1
    },
    avatarColor: {
        type: String,
        required: true,
        default: 'white'
    }
})

module.exports = mongoose.model('User', userSchema);