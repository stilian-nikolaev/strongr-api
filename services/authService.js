const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
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

        const accessToken = generateAccessToken(user);

        return accessToken;

    },
    async login(reqBody) {
        const user = await User.findOne({ email: reqBody.email });

        if (!user) {
            throw { message: 'User not found!' }
        }

        if (!await bcrypt.compare(reqBody.password, user.password)) {
            throw { message: 'Wrong password' }
        }

        const accessToken = generateAccessToken(user);
        // console.log(accessToken)
        // const refreshToken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET)
        // console.log(refreshToken);

        return accessToken;

    }
}