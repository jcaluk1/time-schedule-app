const express = require("express");

const app = express();

const { init } = require("./db");
init();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const activitesFileRoute = require("./routes/activities");
const coursesFileRoute = require("./routes/courses");
const all = require("./routes/all");

app.use("/", activitesFileRoute);
app.use("/", coursesFileRoute);
app.use("/", all);

const dayDbRoute = require("./routes/dan");
const coureseDbRoute = require("./routes/predmet");
const typeDbRoute = require("./routes/tip");
const groupDbRoute = require("./routes/grupa");
const studentDbRoute = require("./routes/student");
const activityDbRoute = require("./routes/aktivnost");

app.use("/v2/dan", dayDbRoute);
app.use("/v2/predmet", coureseDbRoute);
app.use("/v2/tip", typeDbRoute);
app.use("/v2/grupa", groupDbRoute);
app.use("/v2/student", studentDbRoute);
app.use("/v2/aktivnost", activityDbRoute);

app.use(require("./middlewares/errorHandler"));

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
