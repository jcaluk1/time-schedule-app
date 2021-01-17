const asyncHandler = require("../middlewares/async");
const { Predmet } = require("../db");

exports.getCourses = asyncHandler(async (req, res, next) => {
    const course = await Predmet.findAll();
    return res.json({ succes: true, data: course });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Predmet.findByPk(req.params.id);
    return res.json({ succes: true, data: course });
});

exports.createCourse = asyncHandler(async (req, res, next) => {
    const [course, created] = await Predmet.findOrCreate({ where: { naziv: req.body.naziv } });
    return res.status(201).json({
        succes: true,
        created,
        data: course
    });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const deleted = await Predmet.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyCourse = asyncHandler(async (req, res, next) => {
    const modified = await Predmet.update({ naziv: req.body.naziv }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});
