const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const { validateUserRegister, validateChangePassword } = require('../middlewares/validate');
const authService = require('../services/authService');

const router = Router();

router.post('/register', validateUserRegister, (req, res) => {
    authService.register(req.body)
        .then(token => res.status(201).json(token))
        .catch(error => res.status(400).json(error));
})

router.post('/login', (req, res) => {
    authService.login(req.body)
        .then(token => res.json(token))
        .catch(error => res.status(400).json(error));
})

router.patch('/change-password', authenticate, validateChangePassword, (req, res) => {
    authService.changePassword(req.user.id, req.body)
        .then(() => res.json({message: 'Successfully changed password'}))
        .catch(error => res.status(400).json(error));
})

module.exports = router;