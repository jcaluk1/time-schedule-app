const express = require("express");
const router = express.Router();

const { getCourses, getCourse, createCourse, modifyCourse, deleteCourse } = require("../controlers/predmet");

router.route("/")
    .get(getCourses)
    .post(createCourse);

router.route("/:id")
    .get(getCourse)
    .put(modifyCourse)
    .delete(deleteCourse);

module.exports = router;
