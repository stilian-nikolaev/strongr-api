const { Router } = require('express');

const setController = require('./setController');
const exerciseService = require('../services/exerciseService');

const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const { validateExercise } = require('../middlewares/validate');

const router = Router();

router.use('/:id/sets', setController)

router.get('/', authenticate, authorize, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.getAll(workoutId)
        .then(exercises => res.json(exercises))
        .catch(error => res.status(500).json(error));
})

router.get('/:id', authenticate, authorize, (req, res) => {
    exerciseService.getOne(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(error => res.status(400).json(error));
})

router.post('/', authenticate, authorize, validateExercise, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.create(workoutId, req.body)
        .then(exercise => res.status(201).json(exercise))
        .catch(error => res.status(400).json(error));
})

router.put('/:id', authenticate, authorize, validateExercise, (req, res) => {
    exerciseService.edit(req.params.id, req.body)
        .then(() => res.json({ message: 'Successfully edited exercise' }))
        .catch(error => res.status(400).json(error));
})

router.delete('/:id', authenticate, authorize, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.delete(req.params.id, workoutId)
        .then(exercise => res.json({ message: 'Successfully deleted exercise', exercise }))
        .catch(error => res.status(400).json(error));
})

router.all('*', (req, res) => {
    res.status(400).send('Method not supported for this route');
});

module.exports = router;