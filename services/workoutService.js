const Workout = require('../models/workout');

module.exports = {
    getAll() {
        return Workout.find()
    },
    getOne(id) {
        return Workout.findById(id);
    },
    create(reqBody) {
        //TODO: validate input

        const workout = new Workout({ title: reqBody.title, exercises: reqBody.exercises })
        return workout.save();
    },
    edit(id, reqBody) {
        //TODO: validate input

        return Workout.updateOne({ id }, reqBody);
    },
    delete(id) {
        return Workout.deleteOne({ id });
    },
    async addExercise(workoutId, exerciseId) {
        const workout = await Workout.findById(workoutId);

        const currentExercises = workout.exercises;

        currentExercises.push(exerciseId);

        return Workout.updateOne({_id: workoutId}, {exercises: currentExercises})
    }   

}