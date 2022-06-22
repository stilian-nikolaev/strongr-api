const User = require('../models/user');

module.exports = {
    async getOne(id) {
        const user = await User.findById(id);

        if (!user) {
            throw { message: 'User not found!' }
        }

        return {
            name: user.name,
            activity: user.activity,
            email: user.email,
        }
    }
}