const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')
const authController = require('./controllers/authController')
const profileController = require('./controllers/profileController')

router.use('/auth', authController);
router.use('/workouts', workoutController);
router.use('/profile', profileController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
router.all('*', (req, res) => {
    res.status(400).send('Method not supported for this route');
});

module.exports = router;