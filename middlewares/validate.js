const Joi = require('joi')

module.exports = {
    validateWorkout: (req, res, next) => {
        const validationSchema = Joi.object({
            title: Joi.string().trim().min(1).max(25).required(),

        })

        const { error } = validationSchema.validate({ title: req.body.title })

        if (error) {
            return res.json({ message: error.details.map(x => x.message).join(', ') })
        }

        req.body.title = req.body.title.trim()

        next()
    },
    validateExercise: (req, res, next) => {
        const validationSchema = Joi.object({
            title: Joi.string().trim().min(1).max(25).required(),

        })

        const { error } = validationSchema.validate({ title: req.body.title })

        if (error) {
            return res.json({ message: error.details.map(x => x.message).join(', ') })
        }

        req.body.title = req.body.title.trim()

        next()
    },
    validateSet: (req, res, next) => {
        const validationSchema = Joi.object({
            amount: Joi.number().integer().min(1).max(99).required(),
            weight: Joi.number().min(0).max(999).required(),
            unit: Joi.string().valid('reps', 'sec', 'min').required(),
        })

        const { error } = validationSchema.validate({ amount: req.body.amount, weight: req.body.weight, unit: req.body.unit })

        if (error) {
            return res.json({ message: error.details.map(x => x.message).join(', ') })
        }

        next()
    },
    validateUser: (req, res, next) => {
        const validationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            repeatPassword: Joi.string().required(),
            name: Joi.string().required(),
        })

        const { error } = validationSchema.validate({
            email: req.body.email,
            password: req.body.password,
            repeatPassword: req.body.repeatPassword,
            name: req.body.name
        })

        if (error) {
            return res.status(400).json({ message: error.details.map(x => x.message).join(', ') })
        }

        next()
    },
}