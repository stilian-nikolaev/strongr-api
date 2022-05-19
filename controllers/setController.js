const { Router } = require('express');

const setService = require('../services/setService');

const router = Router();

router.get('/', (req, res) => {
    setService.getAll()
        .then(sets => res.json(sets))
        .catch(error => {
            res.status(500).json({ error, message: "Could not get sets. :(" });
        });
})

router.get('/:id', (req, res) => {
    setService.getOne(req.params.id)
        .then(set => {
            if (set) res.json(set)
            else res.json({ message: "There is no set with specified ID" });
        })
        .catch(error => {
            res.status(400).json({error, message: "Invalid ID" })
        })
})

router.post('/', (req, res) => {
    setService.create(req.body)
        .then(set => res.status(201).json(set))
        .catch(error => {
            res.status(400).json({ error })
        });
})

router.patch('/:id', (req, res) => {
    setService.edit(req.params.id, req.body)
        .then(set => {
            res.json(set)
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

router.delete('/:id', (req, res) => {
    setService.delete(req.params.id)
        .then(set => res.json(set))
        .catch(error => {
            res.status(400).json({ error })
        })
})

module.exports = router;