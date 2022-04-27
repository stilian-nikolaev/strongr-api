require('dotenv').config();

const express = require('express')

const routes = require('./routes');
const configApp = require('./config/express')

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection;

db.on('error', (err) => console.log(err))
db.once('open', () => console.log('open'))

configApp(app);

app.use(routes);

app.listen(5000);