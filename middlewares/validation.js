const Joi = require("joi");

const activitySchema = Joi.object({
    naziv: Joi.string().min(3).max(25).required(),
    tip: Joi.string().valid("predavanje", "vjezbe").required(),
    dan: Joi.string().valid("ponedjeljak", "utorak", "srijeda", "cetvrtak", "petak", "subota", "nedjelja"),
    pocetak: Joi.string().length(5).pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/).required(),
    kraj: Joi.string().length(5).pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/).required()
});



exports.validateActivity = async (req, res, next) => {
    try {
        await activitySchema.validateAsync(req.body);
        if (req.body.pocetak >= req.body.kraj) { return res.status(400).json({ message: "Aktivnost nije validna!" }); }
    } catch (error) {
        // return res.status(500).json(`Validation error: ${error.details.map(x => x.message).join(", ")}`);
        return res.status(400).json({ message: "Aktivnost nije validna!" });
    }
    next();
};

exports.validateCourse = (req, res, next) => {
    const { error, value } = Joi.object({ naziv: Joi.string().required() }).validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Naziv predmeta je obavezan i samo jedan parametar je potreban!" });
    }
    next();
};
