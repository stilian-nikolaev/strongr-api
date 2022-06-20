const { Router } = require('express');
const { validateUser } = require('../middlewares/validate');
const authService = require('../services/authService');

const router = Router();

router.post('/register', validateUser, (req, res) => {
    authService.register(req.body)
        .then(token => res.status(201).json(token))
        .catch(error => res.status(400).json(error));
})

router.post('/login', (req, res) => {
    authService.login(req.body)
        .then(token => res.json(token))
        .catch(error => res.status(400).json(error));
})

module.exports = router;