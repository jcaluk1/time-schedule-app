const express = require("express");
const router = express.Router();

const { getStudents, getStudent, createStudent, modifyStudent, deleteStudent, createStudentsWithGroups } = require("../controlers/student");

router.route("/")
    .get(getStudents)
    .post(createStudent);

router.route("/:id")
    .get(getStudent)
    .put(modifyStudent)
    .delete(deleteStudent);

router.route("/grupa")
    .post(createStudentsWithGroups);
module.exports = router;
