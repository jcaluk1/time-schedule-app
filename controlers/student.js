const asyncHandler = require("../middlewares/async");
const { Student, Grupa, Predmet } = require("../db");

exports.getStudents = asyncHandler(async (req, res, next) => {
    const students = await Student.findAll();
    return res.json({ succes: true, data: students });
});

exports.getStudent = asyncHandler(async (req, res, next) => {
    const student = await Student.findByPk(req.params.id);
    return res.json({ succes: true, data: student });
});

exports.createStudent = asyncHandler(async (req, res, next) => {
    const [student, created] = await Student.findOrCreate({ where: { naziv: req.body.naziv, index: req.body.index } });
    return res.status(201).json({
        succes: true,
        created,
        data: student
    });
});

exports.deleteStudent = asyncHandler(async (req, res, next) => {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    return res.json({
        succes: true,
        deleted
    });
});

exports.modifyStudent = asyncHandler(async (req, res, next) => {
    const modified = await Student.update({ naziv: req.body.naziv, index: req.body.index }, { where: { id: req.params.id } });
    return res.status(201).json({
        succes: true,
        modified: modified[0]
    });
});

exports.createStudentsWithGroups = asyncHandler(async (req, res, next) => {
    const { course: courseName, group: groupName, students } = req.body;
    const [course, courseCreated] = await Predmet.findOrCreate({ where: { naziv: courseName } });
    const [group, groupCreated] = await Grupa.findOrCreate({ where: { naziv: groupName, predmetId: course.id } });
    const responseArray = [];
    for (const student of students) {
        const [dbStudent, studentCreated] = await Student.findOrCreate({
            where: { index: student.index },
            defaults: {
                naziv: student.naziv,
                index: student.index
            }
        });
        if (!studentCreated) {
            if (dbStudent.naziv !== student.naziv) {
                responseArray.push(`Student ${student.naziv} nije kreiran jer postoji student ${dbStudent.naziv} sa indexom ${dbStudent.index}`);
                continue;
            } else {
                // is student on a same course but different group
                const groupWithSameCourse = await dbStudent.getGrupas({ where: { predmetId: course.id } });
                if (groupWithSameCourse) {
                    dbStudent.removeGrupa(groupWithSameCourse);
                }
            }
        }
        // adding gruoup to student
        await dbStudent.addGrupa(group);
    }
    return res.json(responseArray);
});
