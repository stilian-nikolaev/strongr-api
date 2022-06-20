const { Router } = require('express');

const workoutService = require('../services/workoutService');
const exerciseController = require('./exerciseController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { validateWorkout } = require('../middlewares/validate');

const router = Router();

router.use('/:id/exercises', exerciseController);

router.get('/', authenticate, (req, res) => {
    workoutService.getAll(req.user.id)
        .then(workouts => res.json(workouts))
        .catch(error => res.status(500).json(error));
})

router.get('/:id', authenticate, authorize, (req, res) => {
    workoutService.getOne(req.params.id)
        .then(workout => res.json(workout))
        .catch(error => res.status(400).json(error))
})

router.post('/', authenticate, validateWorkout, (req, res) => {
    workoutService.create(req.body, req.user.id)
        .then(workout => res.status(201).json(workout))
        .catch(error => res.status(400).json(error));
})

router.put('/:id', authenticate, authorize, validateWorkout, (req, res) => {
    workoutService.edit(req.params.id, req.body)
        .then(() => res.json({ message: 'Successfully edited workout' }))
        .catch(error => es.status(400).json(error));
})

router.delete('/:id', authenticate, authorize, (req, res) => {
    workoutService.delete(req.params.id)
        .then(workout => res.json({ message: 'Successfully deleted workout', workout }))
        .catch(error => res.status(400).json(error));
})

module.exports = router;