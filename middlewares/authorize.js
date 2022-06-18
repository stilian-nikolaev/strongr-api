const workoutService = require("../services/workoutService");

module.exports = async (req, res, next) => {
    const workoutId = req.originalUrl.split('/')[2];

    const workout = await workoutService.getOne(workoutId);

    if (workout.creatorId !== req.user.id) return res.sendStatus(403);
    
    next()
}