const asyncHandler = require("../middlewares/async");
const { Dan } = require("../db");

exports.getDays = asyncHandler(async (req, res, next) => {
    const days = await Dan.findAll();
    return res.json({ succes: true, data: days });
});

exports.getDay = asyncHandler(async (req, res, next) => {
    const day = await Dan.findByPk(req.params.id);
    return res.json({ succes: true, data: day });
});

exports.createDay = asyncHandler(async (req, res, next) => {
    const [day, created] = await Dan.findOrCreate({ where: { naziv: req.body.naziv } });
    return res.status(201).json({
        succes: true,
        created,
        data: day
    });
});

exports.deleteDay = asyncHandler(async (req, res, next) => {
    const deleted = await Dan.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyDay = asyncHandler(async (req, res, next) => {
    const modified = await Dan.update({ naziv: req.body.naziv }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});
