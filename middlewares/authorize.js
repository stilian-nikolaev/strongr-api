const workoutService = require("../services/workoutService");

module.exports = (req, res, next) => {
    const workoutId = req.originalUrl.split('/')[2];

    workoutService.getOne(workoutId)
        .then(workout => {
            if (workout.creatorId !== req.user.id) return res.status(403).json({ message: 'Unauthorized!' });

            next()
        })
        .catch(error => res.status(400).json(error));


}