const Raspored = function () {
    let start, end, daysOfWeek, numberOfIntervals;
    const slots = [];

    function hoursOk (startHour, endHour) {
        return !(startHour < 0 || endHour > 24 || startHour >= endHour);
    }

    function hourIsWhole (hour) {
        return hour % 1 === 0;
    }

    function hourIsHalf (hour) {
        return Math.abs(hour % 1 - 0.5) < 1e-5;
    }

    function getTimeRow (startHour, endHour, numberOfCells) {
        const HOURS = [0, 2, 4, 6, 8, 10, 12, 15, 17, 19, 21, 23].filter(hour => startHour <= hour && hour < endHour);
        const cells = new Array(numberOfCells).fill("").map(e => document.createElement("td"));
        HOURS.forEach(hour => {
            const title = hour.toString().padStart(2, "0") + ":00";
            const h5 = document.createElement("h5");
            h5.appendChild(document.createTextNode(title));
            h5.classList.add("time-number");

            const i = (hour - startHour) * 2;
            cells[i].classList.add("time-cell");
            cells[i].appendChild(h5);
        });
        const tr = document.createElement("tr");
        tr.appendChild(document.createElement("th"));
        cells.forEach(cell => tr.appendChild(cell));
        return tr;
    }

    function getDayRow (day, numberOfCells) {
        const cells = new Array(numberOfCells).fill("").map(e => document.createElement("td"));
        cells.forEach((cell, i) => cell.classList.add(i % 2 == 0 ? "cell-solid-dash" : "cell-dash-solid"));

        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(day));
        tr.appendChild(th);
        cells.forEach(cell => tr.appendChild(cell));
        return tr;
    }

    const iscrtajRaspored = function (div, days, startHour, endHour) {
        if (!hoursOk(startHour, endHour) || !hourIsWhole(startHour) || !hourIsWhole(endHour) || !div || days.length === 0) {
            div.appendChild(document.createTextNode("Error"));
            return;
        }
        // Global variable initialization
        start = startHour;
        end = endHour;
        daysOfWeek = days;
        numberOfIntervals = (endHour - startHour) * 2;

        const table = document.createElement("table");
        const rows = [getTimeRow(start, end, numberOfIntervals), ...daysOfWeek.map(day => getDayRow(day, numberOfIntervals))];
        rows.forEach(red => table.appendChild(red));
        div.appendChild(table);
    };

    const dodajAktivnost = function (div, name, type, activityStart, activityEnd, day) {
        if (!div.querySelector("table")) {
            return "Error - time table is not created!";
        }

        if (!hoursOk(activityStart, activityEnd) ||
            !(hourIsWhole(activityStart) || hourIsHalf(activityStart)) ||
            !(hourIsWhole(activityEnd) || hourIsHalf(activityEnd)) ||
            !(start <= activityStart && activityEnd <= end) || daysOfWeek.indexOf(day) == -1) {
            return "Error - in the time table there is no day or hour for the new activity!";
        }

        const daySlots = slots.filter(a => a.day == day).sort((a, b) => a.start - b.start);
        let timeIntervalIsFree;
        if (daySlots.length === 0) {
            timeIntervalIsFree = true;
        } else {
            timeIntervalIsFree = !daySlots.some(s =>
                s.start <= activityStart && activityStart < s.end ||
                s.start < activityEnd && activityEnd <= s.end ||
                s.start > activityStart && s.end < activityEnd);
        }

        if (!timeIntervalIsFree) {
            return "Error - there is already an activity in the time table for the given time interval!";
        }

        slots.push({ day: day, start: activityStart, end: activityEnd });

        const startIndex = 1 + (activityStart - start) / 0.5;
        const endIndex = startIndex + (activityEnd - activityStart) / 0.5;

        const nameTitle = document.createElement("h5");
        nameTitle.appendChild(document.createTextNode(name));
        const activityCell = document.createElement("td");
        const borderClass = `cell-${["solid", "dash"][(startIndex - 1) % 2]}-${["solid", "dash"][(endIndex - 1) % 2]}`;
        activityCell.classList = `${borderClass} content`;
        activityCell.setAttribute("colspan", endIndex - startIndex);
        activityCell.appendChild(nameTitle);
        const typeTitle = document.createTextNode(type);
        activityCell.appendChild(typeTitle);

        activityCell.id = "last-added-activity"; // this is used for testing

        const newRow = document.createElement("tr");
        let numOfMergedCells = 0;

        // remove the id of last added cell before adding a new one
        const previousLast = div.querySelector("#last-added-activity");
        if (previousLast) {
            previousLast.removeAttribute("id");
        }

        const oldRow = div.querySelector("table").childNodes[1 + daysOfWeek.indexOf(day)];
        const oldCells = oldRow.childNodes;

        for (let i = 0; i < oldCells.length; i++) {
            const node = oldCells[i].cloneNode(true);
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
    return {
        iscrtajRaspored: iscrtajRaspored,
        dodajAktivnost: dodajAktivnost
    };
};
