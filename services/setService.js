const Set = require('../models/set');
const exerciseService = require('./exerciseService');

module.exports = {
    async getAll(exerciseId) {
        const exercise = await exerciseService.getOne(exerciseId);

        return exercise.sets;
    },
    async getOne(id) {
        let set;

        try {
            set = await Set.findById(id);
        } catch (error) {
            throw { message: 'Invalid set ID' }
        }

        if (!set) {
            throw { message: 'There is no set with specified ID' }
        }

        return set;
    },
    async create(exerciseId, reqBody) {
        await exerciseService.getOne(exerciseId);

        const set = new Set({ amount: reqBody.amount, weight: reqBody.weight, unit: reqBody.unit })

        await exerciseService.addSet(exerciseId, set._id)

        return set.save();
    },
    async edit(id, reqBody) {
        await this.getOne(id)

        return Set.findByIdAndUpdate(id, reqBody);
    },
    async delete(id, exerciseId) {
        await this.getOne(id)

        await exerciseService.removeSet(exerciseId, id)

        return Set.findByIdAndDelete(id);
    }
}