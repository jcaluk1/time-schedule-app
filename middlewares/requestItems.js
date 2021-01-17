const Activity = require("../modelsFile/Activity");
const Course = require("../modelsFile/Course");

exports.requestActivites = async (req, res, next) => {
    req.activites = await Activity.getActivities();
    next();
};

exports.requestCourses = async (req, res, next) => {
    req.courses = await Course.getCourses();
    next();
};
