const { Router } = require('express')
const router = Router()
const workoutController = require('./controllers/workoutController')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')

router.use('/', workoutController);
router.use('/auth', authController);
router.use('/workouts', workoutController);
router.use('/user', userController);
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
router.all('*', (req, res) => {
    res.status(400).send('Method not supported for this route');
});

module.exports = router;