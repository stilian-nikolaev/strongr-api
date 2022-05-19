const Set = require('../models/set');
const exerciseService = require('./exerciseService');

module.exports = {
    getAll() {
        return Set.find()
    },
    getOne(id) {
        return Set.findById(id);
    },
    async create(reqBody) {
        const exercise = await exerciseService.getOne(reqBody.exerciseId);

        if (!exercise) throw { message: 'There is no exercise with the corresponding ID' }

        //TODO: validate input
        const set = new Set({ amount: reqBody.amount, weight: reqBody.weight, exerciseId: reqBody.exerciseId })

        await exerciseService.addSet(reqBody.exerciseId, set._id)

        return set.save();
    },
    edit(id, reqBody) {
        //TODO: validate input
        return Set.updateOne({ id }, reqBody);
    },
    delete(id) {
        return Set.deleteOne({ id });
    }

}