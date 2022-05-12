const Workout = require('../models/workout');

module.exports = {
    getAll() {
        return Workout.find()
    },
    getOne(id) {
        return Workout.findById(id);
    },
    create(reqBody) {
        const workout = new Workout({ title: reqBody.title, exercises: reqBody.exercises })
        return workout.save();
    },
    edit(id, reqBody) {
        return Workout.updateOne({ id }, reqBody);
    },
    delete(id) {
        return Workout.deleteOne({ id });
    }

}