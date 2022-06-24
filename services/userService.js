const User = require('../models/user');
const deleteService = require('./helpers/deleteService');

module.exports = {
    async getOne(id) {
        const user = await User.findById(id);

        if (!user) {
            throw { message: 'User not found!' }
        }

        return {
            email: user.email,
            name: user.name,
            activity: user.activity,
            avatarId: user.avatarId,
            avatarColor: user.avatarColor,
        }
    },
    async edit(id, reqBody) {
        await this.getOne(id)
       
        const user = await User.findByIdAndUpdate(id, reqBody);

        return {
            email: user.email,
            name: user.name,
            activity: user.activity,
            avatarId: user.avatarId,
            avatarColor: user.avatarColor,
            ...reqBody
        }
    },
    async delete(id) {
        await this.getOne(id)

        await deleteService.deleteWorkouts(id);
        
        return User.findByIdAndDelete(id)
    },
}