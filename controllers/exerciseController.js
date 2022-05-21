const { Router } = require('express');

const exerciseService = require('../services/exerciseService');
const setController = require('./setController');

const router = Router();

router.use('/:id/sets', setController)

router.get('/', (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.getAll(workoutId)
        .then(exercises => res.json(exercises))
        .catch(error => {
            res.status(500).json({ error, message: "Could not get exercises. :(" });
        });
})

router.get('/:id', (req, res) => {
    exerciseService.getOne(req.params.id)
        .then(exercise => {
            if (exercise) res.json(exercise)
            else res.json({ message: "There is no exercise with specified ID" });
        })
        .catch(error => {
            res.status(400).json({error, message: "Invalid ID" })
        })
})

router.post('/', (req, res) => {
    const workoutId = req.baseUrl.split('/')[2];

    exerciseService.create(workoutId, req.body)
        .then(exercise => res.status(201).json(exercise))
        .catch(error => {
            res.status(400).json({ error })
        });
})

router.patch('/:id', (req, res) => {
    exerciseService.edit(req.params.id, req.body)
        .then(exercise => {
            res.json({message: 'edited successfully'})
        })
        .catch(error => {
            res.status(400).json({ error })
        })
})

router.delete('/:id', (req, res) => {
    exerciseService.delete(req.params.id)
        .then(exercise => res.json({message: 'deleted successfully'}))
        .catch(error => {
            res.status(400).json({ error })
        })
})

module.exports = router;