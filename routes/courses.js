const express = require("express");
const router = express.Router();

const {
    getCourses,
    getActivitesForCourse,
    postCourse,
    deleteCourse
} = require("../controlers/courses");

const {
    requestActivites,
    requestCourses
} = require("../middlewares/requestItems");

const { validateCourse } = require("../middlewares/validation.js");

router.get("/predmeti", requestCourses, getCourses);
router.get("/predmet/:naziv/aktivnost", requestActivites, getActivitesForCourse);
router.post("/predmet", validateCourse, requestCourses, postCourse);
router.delete("/predmet/:naziv", requestCourses, deleteCourse);

module.exports = router;
