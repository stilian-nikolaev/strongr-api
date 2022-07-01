const express = require('express');

module.exports = (app) => {
    app.use(express.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
        next();
    });

    return app;
}