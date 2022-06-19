const { Router } = require('express');

const workoutService = require('../services/workoutService');
const exerciseController = require('./exerciseController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const validateWorkout = require('../middlewares/validateWorkout');

const router = Router();

router.use('/:id/exercises', exerciseController);

router.get('/', authenticate, (req, res) => {
    workoutService.getAll(req.user.id)
        .then(workouts => res.json(workouts))
        .catch(error => {
            res.status(500).json(error);
        });
})

router.get('/:id', authenticate, authorize, (req, res) => {
    workoutService.getOne(req.params.id)
        .then(workout => res.json(workout))
        .catch(error => {
            res.status(400).json(error)
        })
})

router.post('/', authenticate, validateWorkout, (req, res) => {
    workoutService.create(req.body, req.user.id)
        .then(workout => res.status(201).json(workout))
        .catch(error => {
            res.status(400).json(error)
        });
})

router.patch('/:id', authenticate, authorize, validateWorkout, (req, res) => {
    workoutService.edit(req.params.id, req.body)
        .then(workout => {
            console.log(workout)
            res.json({ message: 'edited successfully' })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

router.delete('/:id', authenticate, authorize, (req, res) => {
    workoutService.delete(req.params.id)
        .then(workout => res.json({ message: 'deleted successfully' }))
        .catch(error => {
            res.status(400).json({ error })
        })
})

module.exports = router;