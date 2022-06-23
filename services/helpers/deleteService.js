const Workout = require('../../models/workout');
const Exercise = require('../../models/exercise');
const Set = require('../../models/set');

module.exports = {
    async deleteWorkouts(userId) {
        const workouts = await Workout.find({ creatorId: userId });
       workouts.forEach(async (workout) => {
        await Workout.findByIdAndDelete(workout._id)
       })
    },
    async deleteExercises(workoutId) {
        const workout = await Workout.findById(workoutId);

        workout.exercises.forEach(async (exerciseId) => {
            await this.deleteSets(exerciseId);            
            await Exercise.findByIdAndDelete(exerciseId)
        });
    },
    async deleteSets(exerciseId) {
        const exercise = await Exercise.findById(exerciseId)

        exercise?.sets.forEach(async (setId) => Set.findByIdAndDelete(setId));
    }
}