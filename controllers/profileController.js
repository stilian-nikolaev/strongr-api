const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const profileService = require('../services/profileService');

const router = Router();

router.get('/', authenticate, (req, res) => {
    profileService.getOne(req.user.id)
        .then(profile => res.json(profile))
        .catch(error => res.status(400).json(error));
})

router.patch('/', authenticate, (req, res) => {
    profileService.edit(req.user.id, req.body)
        .then(profile => res.json(profile))
        .catch(error => res.status(400).json(error));
})

module.exports = router;