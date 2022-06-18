const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    exercises: [{ type: mongoose.Types.ObjectId, ref: 'Exercise' }]
})

module.exports = mongoose.model('Workout', workoutSchema);