const Workout = require('../models/workout');
const deleteService = require('./helpers/deleteService');

module.exports = {
    getAll(userId) {
        return Workout.find({creatorId: userId}).populate({
            path: 'exercises',
            populate: {
                path: 'sets'
            }
        })
    },
    getOne(id) {
        return Workout.findById(id).populate({
            path: 'exercises',
            populate: {
                path: 'sets'
            }
        });
    },
    create(reqBody, userId) {
        //TODO: validate input

        const workout = new Workout({ title: reqBody.title, exercises: reqBody.exercises, creatorId: userId })
        return workout.save();
    },
    edit(id, reqBody) {
        //TODO: validate input

        return Workout.findByIdAndUpdate(id, reqBody);
    },
    async delete(id) {
        //TODO: delete all exercises
        await deleteService.deleteExercises(id)

        return Workout.findByIdAndDelete(id);
    },
    async addExercise(workoutId, exerciseId) {
        const workout = await Workout.findById(workoutId);

        const currentExercises = workout.exercises;

        currentExercises.push(exerciseId);

        return Workout.updateOne({ _id: workoutId }, { exercises: currentExercises })
    },
    async removeExercise(workoutId, exerciseId) {
        const workout = await Workout.findById(workoutId);

        const filteredExercises = workout.exercises.filter(x => x != exerciseId)

        return Workout.updateOne({ _id: workoutId }, { exercises: filteredExercises })
    },

}