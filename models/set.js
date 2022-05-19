const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    exerciseId: mongoose.Types.ObjectId,
    amount: Number,
    weight: Number
})

module.exports = mongoose.model('Set', setSchema);