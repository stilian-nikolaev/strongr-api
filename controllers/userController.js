const { Router } = require('express');

const userService = require('../services/userService');

const authenticate = require('../middlewares/authenticate');
const { validateUserEdit } = require('../middlewares/validate');

const router = Router();

router.get('/', authenticate, (req, res) => {
    userService.getOne(req.user.id)
        .then(user => res.json(user))
        .catch(error => res.status(400).json(error));
})

router.patch('/', authenticate, validateUserEdit, (req, res) => {
    userService.edit(req.user.id, req.body)
        .then(user => res.json({ message: 'Successfully edited user', user }))
        .catch(error => res.status(400).json(error));
})

router.delete('/', authenticate, (req, res) => {
    userService.delete(req.user.id)
        .then(user => res.json({ message: 'Successfully deleted user', user }))
        .catch(error => res.status(400).json(error));
})

router.all('*', (req, res) => {
    res.status(400).send('Method not supported for this route');
});

module.exports = router;