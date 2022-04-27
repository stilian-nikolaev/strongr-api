const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    exercises: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Workout', workoutSchema);