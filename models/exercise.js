const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sets: [{ type: mongoose.Types.ObjectId, ref: 'Set' }]

})

module.exports = mongoose.model('Exercise', exerciseSchema);