const Exercise = require('../models/exercise');
const workoutService = require('./workoutService');

module.exports = {
    getAll() {
        return Exercise.find()
    },
    getOne(id) {
        return Exercise.findById(id);
    },
    create(reqBody) {
        const workout = workoutService.findById(reqBody.workoutId);

        if (!workout) throw { message: 'There is no workout with the corresponding ID' }

        const exercise = new Exercise({ title: reqBody.title, sets: reqBody.sets, workoutId: reqBody.workoutId })
        
        return exercise.save();
    },
    edit(id, reqBody) {
        return Exercise.updateOne({ id }, reqBody);
    },
    delete(id) {
        return Exercise.deleteOne({ id });
    }

}