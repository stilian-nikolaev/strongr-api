const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 5000
    })

    const db = mongoose.connection;

    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('open'))
}