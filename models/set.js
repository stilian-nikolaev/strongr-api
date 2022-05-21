const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: 'reps'
    }
})

module.exports = mongoose.model('Set', setSchema);