const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { validateSet } = require('../middlewares/validate');

const setService = require('../services/setService');

const router = Router();

router.get('/', authenticate, authorize, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.getAll(exerciseId)
        .then(sets => res.json(sets))
        .catch(error => res.status(500).json(error));
})

router.get('/:id', authenticate, authorize, (req, res) => {
    setService.getOne(req.params.id)
        .then(set => res.json(set))
        .catch(error => res.status(400).json(error));
})

router.post('/', authenticate, authorize, validateSet, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.create(exerciseId, req.body)
        .then(set => res.status(201).json(set))
        .catch(error => res.status(400).json(error));
})

router.put('/:id', authenticate, authorize, validateSet, (req, res) => {
    setService.edit(req.params.id, req.body)
        .then(() => res.json({ message: 'Successfully edited set' }))
        .catch(error => res.status(400).json(error));
})

router.delete('/:id', authenticate, authorize, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.delete(req.params.id, exerciseId)
        .then(set => res.json({ message: 'Successfully deleted set', set }))
        .catch(error => res.status(400).json(error));
})

module.exports = router;