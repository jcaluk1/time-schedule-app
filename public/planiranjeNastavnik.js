const BASE_URL = "http://localhost:3000";

const refreshActivities = (activities) => {
    const ul = document.querySelectorAll("ul").item(0);
    ul.innerHTML = "";
    activities.forEach(a => {
        const li = document.createElement("li");
        li.classList.add("card");
        li.textContent = `${a.naziv}, ${a.tip}, ${a.pocetak}, ${a.kraj}, ${a.dan}`;
        ul.appendChild(li);
    });
};

const refreshCourses = (courses) => {
    const ul = document.querySelectorAll("ul").item(1);
    ul.innerHTML = "";
    courses.forEach(course => {
        const li = document.createElement("li");
        li.classList.add("card");
        li.textContent = course.naziv;
        ul.appendChild(li);
    });
};

const refresh = async (refreshBoth) => {
    const GET_ACTIVITIES_URL = `${BASE_URL}/aktivnosti`;
    const GET_COURSES_URL = `${BASE_URL}/predmeti`;
    const activities = await fetch(GET_ACTIVITIES_URL).then(res => res.json());
    refreshActivities(activities);
    if (refreshBoth) {
        const courses = await fetch(GET_COURSES_URL).then(res => res.json());
        refreshCourses(courses);
    }
};

const showMessage = (message, statusOk) => {
    const messageDiv = document.querySelector(".message");
    messageDiv.textContent = message;
    messageDiv.classList.remove("valid", "inValid");
    if (statusOk) {
        messageDiv.classList.add("valid");
    } else {
        messageDiv.classList.add("inValid");
    }
};

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const body = Object.values(this)
        .reduce((obj, field) => {
            if (field.type !== "submit") { obj[field.name] = field.value; }
            return obj;
        }, {});

    const POST_COURSE_URL = `${BASE_URL}/predmet`;
    const POST_ACTIVITY_URL = `${BASE_URL}/aktivnost`;
    const DELETE_COURSE_URL = `${BASE_URL}/predmet/:naziv`;

    try {
        const postCourseMessage = await fetch(POST_COURSE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(({ naziv: body.naziv }))
        }).then(res => res.json());

        const postActivityMessage = await fetch(POST_ACTIVITY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json());

        const courseMessage = postCourseMessage.message;
        const activityMessage = postActivityMessage.message;

        if (activityMessage !== "Uspješno dodana aktivnost!") {
            if (courseMessage === "Uspješno dodan predmet!") {
                const url = DELETE_COURSE_URL.replace(":naziv", body.naziv);
                await fetch(url, { method: "DELETE" });
            }
        } else {
            await refresh(courseMessage === "Uspješno dodan predmet!");
        }
        showMessage(activityMessage, activityMessage === "Uspješno dodana aktivnost!");
    } catch (err) {
        console.log("Error: ", err);
    }
});

refresh(true);
