const Exercise = require('../models/exercise');
const workoutService = require('./workoutService');
const deleteService = require('./helpers/deleteService');

module.exports = {
    async getAll(workoutId) {
        const workout = await workoutService.getOne(workoutId);

        return workout.exercises;
    },
    async getOne(id) {
        let exercise;

        try {
            exercise = await Exercise.findById(id).populate('sets');
        } catch (error) {
            throw { message: 'Invalid exercise ID' }
        }

        if (!exercise) {
            throw { message: 'There is no exercise with specified ID' }
        }

        return exercise;
    },
    async create(workoutId, reqBody) {
        const exercise = new Exercise({ title: reqBody.title })

        await workoutService.addExercise(workoutId, exercise._id)

        return exercise.save();
    },
    async edit(id, reqBody) {
        await this.getOne(id)

        return Exercise.findByIdAndUpdate(id, reqBody);
    },
    async delete(id, workoutId) {
        await this.getOne(id)

        await deleteService.deleteSets(id)

        await workoutService.removeExercise(workoutId, id);

        return Exercise.findByIdAndDelete(id);
    },
    async addSet(exerciseId, setId) {
        const exercise = await Exercise.findById(exerciseId);

        const currentSets = exercise.sets;

        currentSets.push(setId);

        return Exercise.updateOne({ _id: exerciseId }, { sets: currentSets })
    },
    async removeSet(exerciseId, setId) {
        const exercise = await Exercise.findById(exerciseId);

        const filteredSets = exercise.sets.filter(x => x != setId)

        return Exercise.updateOne({ _id: exerciseId }, { sets: filteredSets })
    }
}