const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 5000
    })

    const db = mongoose.connection;

    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('open'))
}