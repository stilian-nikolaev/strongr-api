const express = require('express');

module.exports = (app) => {
    app.use(express.json());

    //configure cors used for dev
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, HEAD, OPTIONS");
        next();
    });

    return app;
}