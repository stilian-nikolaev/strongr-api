const User = require('../models/user');

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
            ...reqBody
        }
    },
}