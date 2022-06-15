const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

router.post('/register', (req, res) => {
    authService.register(req.body)
        .then(() => res.status(201).json('created'))
        .catch(error => {
            res.status(400).json({ error })
        });
})

router.post('/login', (req, res) => {
    authService.login(req.body)
        .then((token) => res.json(token))
        .catch(error => {
            res.status(400).json({ error })
        });
})

module.exports = router;