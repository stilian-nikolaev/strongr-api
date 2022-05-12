const { Router } = require('express');

const exerciseService = require('../services/exerciseService');

const router = Router();

router.get('/', (req, res) => {
    exerciseService.getAll()
        .then(workouts => res.json(workouts))
        .catch(err => {
            res.status(500).json({ message: "Could not get exercises. :(" });
        });
})

router.get('/:id', (req, res) => {
    exerciseService.getOne(req.params.id)
        .then(workout => {
            if (workout) res.json(workout)
            else res.json({ message: "There is no exercise with specified ID" });
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid ID" })
        })
})

router.post('/', (req, res) => {
    exerciseService.create(req.body)
        .then(workout => res.status(201).json(workout))
        .catch(err => {
            res.status(401).json({ message: err.message })
        });
})

router.patch('/:id', (req, res) => {
    exerciseService.edit(req.params.id, req.body)
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            res.status(401).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    exerciseService.delete(req.params.id)
        .then(workout => res.json(workout))
        .catch(err => {
            res.status(401).json({ message: err.message })
        })
})

module.exports = router;