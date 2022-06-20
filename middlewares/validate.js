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
            weight: Joi.number().min(0).max(800).required(),
            unit: Joi.string().trim().valid('reps', 'sec', 'min'),
        })

        const { error } = validationSchema.validate(req.body)

        if (error) {
            return res.json({ message: error.details.map(x => x.message).join(', ') })
        }

        next()
    },
}