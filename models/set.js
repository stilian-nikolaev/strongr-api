const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    amount: Number,
    weight: Number
})

module.exports = mongoose.model('Set', setSchema);