const Joi = require('joi')

module.exports = (req, res, next) => {
    const validationSchema = Joi.object({
        title: Joi.string().min(1).max(25).required(),

    })

    const { error } = validationSchema.validate({ title: req.body.title })

    if (error) {
        return res.json({message: error.details.map(x=>x.message).join(', ')})
    }

    next()
}