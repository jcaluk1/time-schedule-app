const asyncHandler = require("../middlewares/async");
const { Aktivnost } = require("../db");

exports.getActivities = asyncHandler(async (req, res, next) => {
    const activities = await Aktivnost.findAll();
    return res.json({ succes: true, data: activities });
});

exports.getActivity = asyncHandler(async (req, res, next) => {
    const activity = await Aktivnost.findByPk(req.params.id);
    return res.json({ succes: true, data: activity });
});

exports.createActivity = asyncHandler(async (req, res, next) => {
    const [activity, created] = await Aktivnost.findOrCreate({ where: { ...req.body } });
    return res.status(201).json({
        succes: true,
        created,
        data: activity
    });
});

exports.deleteActivity = asyncHandler(async (req, res, next) => {
    const deleted = await Aktivnost.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyActivity = asyncHandler(async (req, res, next) => {
    const modified = await Aktivnost.update({ ...req.body }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});
