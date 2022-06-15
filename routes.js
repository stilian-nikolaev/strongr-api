const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')
const authController = require('./controllers/authController')

router.use('/auth', authController);
router.use('/workouts', workoutController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;