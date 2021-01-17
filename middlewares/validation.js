const Joi = require("joi");
const asyncHandler = require("./async");
const { Aktivnost, sequelize } = require("../db");

const activitySchema = Joi.object({
    naziv: Joi.string().min(2).max(25).required(),
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
        return res.status(400).json({ message: "Aktivnost nije validna!" });
    }
    next();
};

exports.validateCourse = (req, res, next) => {
    const { error } = Joi.object({ naziv: Joi.string().required() }).validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Naziv predmeta je obavezan i samo jedan parametar je potreban!" });
    }
    next();
};

const activityDbSchema = Joi.object({
    naziv: Joi.string().min(2).max(50).required(),
    pocetak: Joi.number().min(0).max(24).required(),
    kraj: Joi.number().min(0).max(24).greater(Joi.ref("pocetak")).required(),
    predmetId: Joi.number().integer().greater(0).required(),
    tipId: Joi.number().integer().greater(0).required(),
    danId: Joi.number().integer().greater(0).required(),
    grupaId: Joi.number().integer().greater(0)
});

exports.validateActivityDb = asyncHandler(async (req, res, next) => {
    await activityDbSchema.validateAsync(req.body);
    const { grupaId, danId, pocetak, kraj } = req.body;
    let queryString;
    if (req.params.id)
        queryString = `SELECT * FROM aktivnost a WHERE a.id != '${req.params.id}' AND a.grupaId = '${grupaId}' AND a.danId = '${danId}' AND ('${pocetak}' < a.kraj AND a.kraj < '${kraj}' OR a.pocetak < '${kraj}' AND '${kraj}' <= a.kraj);`;
    else
        queryString = `SELECT * FROM aktivnost a WHERE a.grupaId = '${grupaId}' AND a.danId = '${danId}' AND ('${pocetak}' < a.kraj AND a.kraj < '${kraj}' OR a.pocetak < '${kraj}' AND '${kraj}' <= a.kraj);`;
        const [results, metadata] = await sequelize.query(queryString);
    if (results.length) {
        next("Termin aktivnosti se poklapa sa već postojećim!");
    }
    next();
});
