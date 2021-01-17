const asyncHandler = require("../middlewares/async");
const { Tip } = require("../db");

exports.getTypes = asyncHandler(async (req, res, next) => {
    const type = await Tip.findAll();
    return res.json({ succes: true, data: type });
});

exports.getType = asyncHandler(async (req, res, next) => {
    const type = await Tip.findByPk(req.params.id);
    return res.json({ succes: true, data: type });
});

exports.createType = asyncHandler(async (req, res, next) => {
    const [type, created] = await Tip.findOrCreate({ where: { naziv: req.body.naziv } });
    return res.status(201).json({
        succes: true,
        created,
        data: type
    });
});

exports.deleteType = asyncHandler(async (req, res, next) => {
    const deleted = await Tip.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyType = asyncHandler(async (req, res, next) => {
    const modified = await Tip.update({ naziv: req.body.naziv }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});
