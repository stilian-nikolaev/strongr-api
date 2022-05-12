const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    workoutId: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema);