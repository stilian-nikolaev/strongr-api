const bcrypt = require('bcrypt');
const User = require('../models/user');


module.exports = {
    async register(reqBody) {
        if (reqBody.password !== reqBody.repeatPassword) {
            throw { message: 'Passwords missmatch!' }
        }

        const hashedPassword = await bcrypt.hash(reqBody.password, 10);

        const user = new User({ name: reqBody.name, email: reqBody.email, password: hashedPassword });

        return user.save();

    },
    async login(reqBody) {
        const user = await User.findOne({ email: reqBody.email });

        if (!user) {
            throw { message: 'User not found!' }
        }

        if (await bcrypt.compare(reqBody.password, user.password)) {
            console.log('log');
            return user
        } else {
            throw { message: 'Wrong password' }
        }
    }
}