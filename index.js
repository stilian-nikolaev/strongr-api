require('dotenv').config();

const express = require('express')

const routes = require('./routes')
const configApp = require('./config/express')
const configDatabase = require('./config/mongo')

const app = express();

configApp(app)
configDatabase()

app.use(routes)

app.listen(process.env.PORT || 5000)