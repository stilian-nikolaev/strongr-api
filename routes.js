const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')

router.use('/workouts', workoutController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;