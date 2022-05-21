const Exercise = require('../models/exercise');
const workoutService = require('./workoutService');

module.exports = {
    async getAll(workoutId) {
        if (!workoutId) {
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
        const exercise = new Exercise({ title: reqBody.title})

        await workoutService.addExercise(workoutId, exercise._id)

        return exercise.save();
    },
    edit(id, reqBody) {
        //TODO: validate input
        console.log(reqBody);
        return Exercise.findByIdAndUpdate( id, reqBody);
    },
    delete(id) {
        return Exercise.deleteOne({ id });
    },
    async addSet(exerciseId, setId) {
        const exercise = await Exercise.findById(exerciseId);

        const currentSets = exercise.sets;

        currentSets.push(setId);

        return Exercise.updateOne({ _id: exerciseId }, { sets: currentSets })
    }

}