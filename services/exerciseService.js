const Exercise = require('../models/exercise');
const deleteService = require('./helpers/deleteService');
const workoutService = require('./workoutService');

module.exports = {
    async getAll(workoutId) {
        if (!workoutId) {
            //do we want that?
            return Exercise.find().populate('sets')
        }

        const workout = await workoutService.getOne(workoutId);

        //if(!workout) ?

        return workout.exercises;
    },
    getOne(id) {
        return Exercise.findById(id).populate('sets');
    },
    async create(workoutId, reqBody) {
        const workout = await workoutService.getOne(workoutId);

        if (!workout) throw { message: 'There is no workout with the corresponding ID' }

        //TODO: validate input
        const exercise = new Exercise({ title: reqBody.title })

        await workoutService.addExercise(workoutId, exercise._id)

        return exercise.save();
    },
    edit(id, reqBody) {
        //TODO: validate input
        console.log(reqBody);
        return Exercise.findByIdAndUpdate(id, reqBody);
    },
    async delete(id, workoutId) {
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

        console.log(`filtered: ${filteredSets}`);
        console.log(`exercise id: ${exerciseId}`);
        console.log(`set id: ${setId}`);

        return Exercise.updateOne({ _id: exerciseId }, { sets: filteredSets })
    }


}