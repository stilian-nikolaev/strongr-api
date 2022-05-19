const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    workoutId: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        default: 'reps'
    },
    sets: [{ type: mongoose.Types.ObjectId, ref: 'Set' }]

})

module.exports = mongoose.model('Exercise', exerciseSchema);