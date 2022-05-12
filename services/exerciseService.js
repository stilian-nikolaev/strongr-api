const Exercise = require('../models/exercise');
const workoutService = require('./workoutService');

module.exports = {
    getAll() {
        return Exercise.find()
    },
    getOne(id) {
        return Exercise.findById(id);
    },
    async create(reqBody) {
        const workout = await workoutService.getOne(reqBody.workoutId);

        if (!workout) throw { message: 'There is no workout with the corresponding ID' }

        //TODO: validate input
        const exercise = new Exercise({ title: reqBody.title, sets: reqBody.sets, workoutId: reqBody.workoutId })

        await workoutService.addExercise(reqBody.workoutId, exercise._id)

        return exercise.save();
    },
    edit(id, reqBody) {
        //TODO: validate input
        return Exercise.updateOne({ id }, reqBody);
    },
    delete(id) {
        return Exercise.deleteOne({ id });
    }

}