const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    app.use(express.json());

    app.use(cors({
        origin: 'https://strongr-workout-planner.netlify.app',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    }));

    return app;
}