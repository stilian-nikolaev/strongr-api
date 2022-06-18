const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');

const setService = require('../services/setService');

const router = Router();

router.get('/', authenticate, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.getAll(exerciseId)
        .then(sets => res.json(sets))
        .catch(error => {
            res.status(500).json({ error, message: "Could not get sets. :(" });
        });
})

router.get('/:id', authenticate, (req, res) => {
    setService.getOne(req.params.id)
        .then(set => {
            if (set) res.json(set)
            else res.json({ message: "There is no set with specified ID" });
        })
        .catch(error => {
            res.status(400).json({error, message: "Invalid ID" })
        })
})

router.post('/', authenticate, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.create(exerciseId, req.body)
        .then(set => res.status(201).json(set))
        .catch(error => {
            res.status(400).json({ error })
        });
})

router.patch('/:id', authenticate, (req, res) => {
    setService.edit(req.params.id, req.body)
        .then(set => {
            res.json({message: 'edited successfully'})
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

router.delete('/:id', authenticate, (req, res) => {
    const exerciseId = req.baseUrl.split('/')[4];

    setService.delete(req.params.id, exerciseId)
        .then(set => res.json({message: 'deleted successfully'}))
        .catch(error => {
            res.status(400).json({ error })
        })
})

module.exports = router;