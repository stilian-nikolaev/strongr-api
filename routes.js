const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')
const exerciseController = require('./controllers/exerciseController')

router.use('/workouts', workoutController);
router.use('/exercises', exerciseController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;