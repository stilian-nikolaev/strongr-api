const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DATABASE_URL);

    const db = mongoose.connection;

    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log('open'))
}