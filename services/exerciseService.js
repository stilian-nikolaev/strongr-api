const Exercise = require('../models/exercise');

module.exports = {
    getAll() {
        return Exercise.find()
    },
    getOne(id) {
        return Exercise.findById(id);
    },
    create(reqBody) {
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