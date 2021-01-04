const Course = require("../models/Course");

exports.getCourses = async (req, res, next) => {
    return res.json(req.courses);
};

exports.getActivitesForCourse = async (req, res, next) => {
    const activites = req.activites.filter(act => act.naziv === req.params.naziv);
    res.json(activites);
};

exports.postCourse = async (req, res, next) => {
    const courseEgsists = req.courses.some(course => course.naziv === req.body.naziv);
    if (courseEgsists) {
        res.status(200).json({ message: "Naziv predmeta postoji" });
    } else {
        await Course.setCourses([...req.courses, req.body]);
        res.status(201).json({ message: "Uspješno dodan predmet!" });
    }
};

exports.deleteCourse = async (req, res, next) => {
    const i = req.courses.findIndex(course => course.naziv === req.params.naziv);
    if (i === -1) {
        return res.status(400).json({ message: "Greška - predmet nije obrisan!" });
    }
    req.courses.splice(i, 1);
    await Course.setCourses(req.courses);
    res.status(202).json({ message: "”Uspješno obrisan predmet!" });
};
