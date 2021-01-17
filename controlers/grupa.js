const asyncHandler = require("../middlewares/async");
const { Grupa, Predmet } = require("../db");

exports.getGroups = asyncHandler(async (req, res, next) => {
    const group = await Grupa.findAll({ include: Predmet });
    return res.json({ succes: true, data: group });
});

exports.getGroup = asyncHandler(async (req, res, next) => {
    const group = await Grupa.findByPk(req.params.id, { include: Predmet });
    return res.json({ succes: true, data: group });
});

exports.createGroup = asyncHandler(async (req, res, next) => {
    const [group, created] = await Grupa.findOrCreate({ where: { naziv: req.body.naziv, predmetId: req.body.predmetId } });
    return res.status(201).json({
        succes: true,
        created,
        data: group
    });
});

exports.deleteGroup = asyncHandler(async (req, res, next) => {
    const deleted = await Grupa.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyGroup = asyncHandler(async (req, res, next) => {
    const modified = await Grupa.update({ naziv: req.body.naziv, predmetId: req.body.predmetId }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});
