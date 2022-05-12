const { Router } = require('express');

const workoutService = require('../services/workoutService');

const router = Router();

router.get('/', (req, res) => {
    workoutService.getAll()
        .then(workouts => res.json(workouts))
        .catch(err => {
            res.status(500).json({ message: "Could not get workouts. :(" });
        });
})

router.get('/:id', (req, res) => {
    workoutService.getOne(req.params.id)
        .then(workout => {
            if (workout) res.json(workout)
            else res.json({ message: "There is no workout with specified ID" });
        })
        .catch(err => {
            res.status(400).json({ message: "Invalid ID" })
        })
})

router.post('/', (req, res) => {
    workoutService.create(req.body)
        .then(workout => res.status(201).json(workout))
        .catch(err => {
            res.status(401).json({ message: err.message })
        });
})

router.patch('/:id', (req, res) => {
    workoutService.edit(req.params.id, req.body)
        .then(workout => {
            res.json(workout)
        })
        .catch(err => {
            res.status(401).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    workoutService.delete(req.params.id)
        .then(workout => res.json(workout))
        .catch(err => {
            res.status(401).json({ message: err.message })
        })
})

module.exports = router;