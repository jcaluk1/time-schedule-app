document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const textAreaValue = this.unos.value;
    const groupName = this.grupa.value;

    const index = groupName.indexOf("grupa");
    const courseName = groupName.slice(0, index);
    const students = textAreaValue.trim("").split("\n").map(row => {
        const [naziv, index] = row.trim().split(",").map(e => e.trim());
        return { naziv, index };
    });

    const body = {
        course: courseName,
        group: groupName,
        students
    };

    const BASE_URL = "http://localhost:3000/v2";
    const POST_STUDENT_GROUP_URL = `${BASE_URL}/student/grupa`;

    try {
        const messages = await fetch(POST_STUDENT_GROUP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json());
        const responseString = messages.map(e => "· " + e).join("\n");
        this.unos.value = responseString;
    } catch (err) {
        console.log(err);
    }
});
