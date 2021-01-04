function iscrtajRaspored (div, days, startHour, endHour) {
    if (startHour < 0 || endHour > 24 || startHour >= endHour ||
        startHour != parseInt(startHour) || endHour != parseInt(endHour)) {
        div.textContent = "Error - table is not created!";
        return;
    }

    const numberOfCells = (endHour - startHour) * 2;
    const hoursToShow = [0, 2, 4, 6, 8, 10, 12, 15, 17, 19, 21, 23];

    const table = document.createElement("table");
    const rows = [];

    const firstRow = document.createElement("tr");
    const firstTh = document.createElement("th");
    const arrayOfTimeValues = new Array(numberOfCells).fill("");

    hoursToShow.filter(h => startHour <= h && h < endHour)
        .forEach(h => {
            const i = (h - startHour) * 2;
            arrayOfTimeValues[i] = `${("" + h).padStart(2, "0")}:00`;
        });

    const timeCells = arrayOfTimeValues.map(e => {
        const td = document.createElement("td");
        if (e !== "") {
            const h5 = document.createElement("h5");
            h5.textContent = e;
            h5.classList.add("time-number");
            td.appendChild(h5);
            td.classList.add("time-cell");
        }
        return td;
    });

    firstRow.appendChild(firstTh);
    timeCells.forEach(cell => firstRow.appendChild(cell));
    rows.push(firstRow);

    days.forEach(day => {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = day;
        row.appendChild(th);
        new Array(numberOfCells).fill("")
            .map((e, i) => {
                const td = document.createElement("td");
                td.classList.add(i % 2 == 0 ? "cell-solid-dash" : "cell-dash-solid");
                return td;
            })
            .forEach(cell => row.appendChild(cell));
        rows.push(row);
    });

    rows.forEach(red => table.appendChild(red));
    div.appendChild(table);
}

function dodajAktivnost (div, name, type, activityStart, activityEnd, day) {
    if (!div.querySelector("table")) {
        return "Error - time table is not created!";
    }
    const timeCells = Array.from(div.querySelector("tr").querySelectorAll("td"));
    const firstTimeCellWithContent = timeCells.map((c, i) => ({ i, time: c.textContent })).find(o => o.time !== "");

    const startHour = parseInt(firstTimeCellWithContent.time.split(":")[0]) - 0.5 * firstTimeCellWithContent.i;
    const endHour = startHour + timeCells.length / 2;
    const dayOfActivity = Array.from(div.getElementsByTagName("th")).find(th => th.textContent === day);

    if (!(activityStart == parseInt(activityStart) || activityStart % 1 == 0.5) ||
        !(activityEnd == parseInt(activityEnd) || activityEnd % 1 == 0.5) ||
        activityStart >= activityEnd ||
        !(startHour <= activityStart && activityEnd <= endHour) || !dayOfActivity)
    {
        return "Error - in the time table there is no day or hour for the new activity!";
    }

    const oldRow = dayOfActivity.parentElement;

    const unoccupiedTimeIntervals = Array.from(oldRow.childNodes).flatMap(node => {
        if (node.tagName === "TD" && node.getAttribute("colspan")) {
            return new Array(+node.getAttribute("colspan")).fill(false);
        }
        return true;
    });

    const startIndex = 1 + (activityStart - startHour) / 0.5;
    const endIndex = startIndex + (activityEnd - activityStart) / 0.5;

    const timeIntervalIsFree = unoccupiedTimeIntervals.slice(startIndex, endIndex).every(e => e);
    if (!timeIntervalIsFree) {
        return "Error - there is already an activity in the time table for the given time interval";
    }

    const nameTitle = document.createElement("h5");
    nameTitle.textContent = name;

    const activityCell = document.createElement("td");
    const borderClass = `cell-${["solid", "dash"][(startIndex - 1) % 2]}-${["solid", "dash"][(endIndex - 1) % 2]}`;
    activityCell.classList = `${borderClass} content`;
    activityCell.setAttribute("colspan", endIndex - startIndex);
    activityCell.appendChild(nameTitle);

    const typeTitle = document.createTextNode(type);
    activityCell.appendChild(typeTitle);

    const newRow = document.createElement("tr");
    let numOfMergedCells = 0;

    for (let i = 0; i < oldRow.childElementCount; i++) {
        const node = oldRow.childNodes[i].cloneNode(true);
        if (i + numOfMergedCells === startIndex) {
            newRow.appendChild(activityCell);
            i += endIndex - startIndex - 1;
        } else {
            if (node.tagName === "TD" && node.getAttribute("colspan")) {
                numOfMergedCells += parseInt(node.getAttribute("colspan")) - 1;
            }
            newRow.appendChild(node);
        }
    }
    oldRow.parentElement.replaceChild(newRow, oldRow);
    return "New activity successfully added";
};
