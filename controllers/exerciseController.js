const { Router } = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const exerciseService = require('../services/exerciseService');
const setController = require('./setController');

const router = Router();

router.use('/:id/sets', setController)

router.get('/', authenticate, authorize, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.getAll(workoutId, req.user.id)
        .then(exercises => res.json(exercises))
        .catch(error => {
            res.status(500).json({ error, message: "Could not get exercises. :(" });
        });
})

router.get('/:id', authenticate, authorize, (req, res) => {
    exerciseService.getOne(req.params.id, req.user.id)
        .then(exercise => {
            if (exercise) res.json(exercise)
            else res.json({ message: "There is no exercise with specified ID" });
        })
        .catch(error => {
            res.status(400).json({error, message: "Invalid ID" })
        })
})

router.post('/', authenticate, authorize, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.create(workoutId, req.body, req.user.id)
        .then(exercise => res.status(201).json(exercise))
        .catch(error => {
            res.status(400).json({ error })
        });
})

router.patch('/:id', authenticate, authorize, (req, res) => {
    exerciseService.edit(req.params.id, req.body)
        .then(exercise => {
            res.json({message: 'edited successfully'})
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

router.delete('/:id', authenticate, authorize, (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];
    
    exerciseService.delete(req.params.id, workoutId)
        .then(exercise => res.json({message: 'deleted successfully'}))
        .catch(error => {
            res.status(400).json({ error })
        })
})

module.exports = router;