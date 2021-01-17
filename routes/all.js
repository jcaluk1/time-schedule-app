const express = require("express");
const router = express.Router();

const Course = require("../modelsFile/Course");
const Activity = require("../modelsFile/Activity");

const deleteAll = async (req, res, next) => {
    await Course.setCourses([]);
    await Activity.setActivites([]);
    res.json({ message: "Uspješno obrisan sadržaj datoteka!" });
};

router.delete("/all", deleteAll);

module.exports = router;
