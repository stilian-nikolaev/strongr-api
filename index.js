require('dotenv').config();

const express = require('express')

const routes = require('./routes')
const configApp = require('./config/express')
const configDb = require('./config/mongo')

const app = express();

configApp(app)
configDb()

app.use(routes)

app.listen(5000)