const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const activites = require("./routes/activities");
const courses = require("./routes/courses");
const all = require("./routes/all");

app.use("/", activites);
app.use("/", courses);
app.use("/", all);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
