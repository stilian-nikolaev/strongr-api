const { Router } = require('express');

const workoutService = require('../services/workoutService');

const router = Router();

router.get('/', (req, res) => {
    workoutService.getAll()
        .then(workouts => res.json(workouts));
})

router.get('/:id', (req, res) => {
    workoutService.getOne(req.params.id)
        .then(workout => {
            workout && res.json(workout);
            res.status(401).json({ message: "There is no workout with specified ID" });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({ message: "Invalid ID" })
        });
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
        .then(workout => res.json(workout));
})

router.delete('/:id', (req, res) => {
    workoutService.delete(req.params.id)
        .then(workout => res.json(workout));
})

module.exports = router;