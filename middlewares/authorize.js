const workoutService = require("../services/workoutService");

module.exports = (req, res, next) => {
    const workoutId = req.originalUrl.split('/')[2];

    workoutService.getOne(workoutId)
        .then(workout => {
            if (workout.creatorId !== req.user.id) return res.sendStatus(403);

            next()
        })
        .catch(error => res.json(error));


}