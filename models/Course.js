const file = require("../utils/file");
const path = require("path");
const fileLocation = path.join(__dirname, "../predmeti.txt");

const Course = {
    getCourses: async () => {
        try {
            const data = await file.read(fileLocation);
            const courses = data.trim().split("\n").map(row => {
                const naziv = row.trim();
                return { naziv };
            });
            return courses;
        } catch (err) {
            return [];
        }
    },
    setCourses: async (courses) => {
        const data = courses.map(course => course.naziv).join("\n");
        await file.write(fileLocation, data);
        return true;
    }
};

module.exports = Course;
