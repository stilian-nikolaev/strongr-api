const Workout = require('../models/workout');
const deleteService = require('./helpers/deleteService');

module.exports = {
    getAll(userId) {
        return Workout.find({ creatorId: userId }).populate({
            path: 'exercises',
            populate: {
                path: 'sets'
            }
        })
    },
    async getOne(id) {
        let workout;

        try {
            workout = await Workout.findById(id).populate({
                path: 'exercises',
                populate: {
                    path: 'sets'
                }
            })
        } catch (error) {
            throw { message: 'Invalid ID', error }
        }


        if (!workout) {
            throw { message: 'There is no workout with specified ID' }
        }

        return workout;
    },
    create(reqBody, userId) {
        const workout = new Workout({ title: reqBody.title, creatorId: userId })

        return workout.save();
    },
    async edit(id, reqBody) {
        return Workout.findByIdAndUpdate(id, reqBody);
    },
    async delete(id) {
        await deleteService.deleteExercises(id)

        return Workout.findByIdAndDelete(id);
    },
    async addExercise(workoutId, exerciseId) {
        const workout = await Workout.findById(workoutId);

        const currentExercises = workout.exercises;

        currentExercises.push(exerciseId);

        return Workout.findByIdAndUpdate(workoutId, { exercises: currentExercises })
    },
    async removeExercise(workoutId, exerciseId) {
        const workout = await Workout.findById(workoutId);

        const filteredExercises = workout.exercises.filter(x => x != exerciseId)

        return Workout.findByIdAndUpdate(workoutId, { exercises: filteredExercises })
    },

}