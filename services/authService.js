const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return {
        token: jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }),
        expiresAt: Date.now() + Number(process.env.JWT_EXPIRES_IN.split('ms')[0])
    }
}

module.exports = {
    async register(reqBody) {
        const existingUser = await User.findOne({ email: reqBody.email });

        if (existingUser) {
            throw { message: 'There is an existing acount registered with this email' }
        }

        if (reqBody.password !== reqBody.repeatPassword) {
            throw { message: 'Passwords missmatch!' }
        }

        const hashedPassword = await bcrypt.hash(reqBody.password, 10);

        const user = new User({ name: reqBody.name, email: reqBody.email, password: hashedPassword });

        try {
            user.save();
        } catch (error) {
            throw { message: 'Error while saving user', error }
        }

        return generateAccessToken(user);
    },
    async login(reqBody) {
        const user = await User.findOne({ email: reqBody.email });

        if (!user) {
            throw { message: 'User not found!' }
        }

        if (!await bcrypt.compare(reqBody.password, user.password)) {
            throw { message: 'Wrong password' }
        }
        
        return generateAccessToken(user);
    }
}