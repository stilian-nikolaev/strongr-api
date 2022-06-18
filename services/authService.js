const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

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

            const accessToken = generateAccessToken(user);
            // console.log(accessToken)
            // const refreshToken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET)
            // console.log(refreshToken);

            return accessToken;
        } else {
            throw { message: 'Wrong password' }
        }
    }
}