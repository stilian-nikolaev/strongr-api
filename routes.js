const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')
const exerciseController = require('./controllers/exerciseController')
const setController = require('./controllers/setController')

router.use('/workouts', workoutController);
router.use('/exercises', exerciseController);
router.use('/sets', setController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;