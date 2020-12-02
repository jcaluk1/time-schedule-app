const assert = chai.assert;
describe("iscrtajModul", () => {
    describe("iscrtajRaspored", () => {
        const divTest1 = document.getElementById("test1");

        afterEach(() => divTest1.innerHTML = "");

        it("all the given days should be included in the table", () => {
           const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
           new Raspored().iscrtajRaspored(divTest1, days, 8, 21);
           const tableDays = Array.from(divTest1.querySelectorAll("th")).slice(1).map(th => th.textContent);
           assert.equal(JSON.stringify(days), JSON.stringify(tableDays));
        });

        it("starting hour should be included if it is in [0, 2, 4, 6, 8, 10, 12, 15, 17, 19, 21, 23];", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8;
            const startHourString = "08:00";
            const endHour = 21;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            const tableStartTime = Array.from(divTest1.querySelectorAll(".time-cell")).map(h5 => h5.textContent).find(content => content === startHourString);
            assert.equal(startHourString, tableStartTime);
         });

         it("ending hours is never included", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8;
            const endHour = 21;
            const endHourString = "21:00";
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            const tableEndTime = Array.from(divTest1.querySelectorAll(".time-cell")).map(h5 => h5.textContent).find(content => content === endHourString);
            assert.isUndefined(tableEndTime, "end time is never shown in table");
         });

         it("number of intervals should be (endHour-startHour)*2", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8;
            const endHour = 21;
            const numberOfIntervals = (endHour - startHour) * 2;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            const tableNumOfIntervals = divTest1.querySelector("tr").querySelectorAll("td").length;
            assert.equal(numberOfIntervals, tableNumOfIntervals);
         });

         it("minimum number of days is one, so only one day should be rendered", () => {
            const days = ["Only One Day"];
            new Raspored().iscrtajRaspored(divTest1, days, 8, 21);
            const tableDays = Array.from(divTest1.querySelectorAll("th")).slice(1);
            assert.equal(tableDays.length, 1);
            assert.equal(tableDays[0].textContent, days[0]);
         });

         it("minmal time interval is one hour, so only two cells shoud be rendered", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8;
            const endHour = 9;
            const numberOfIntervals = (endHour - startHour) * 2;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            const tableNumberOfIntervals = divTest1.querySelector("tr").querySelectorAll("td").length;
            assert.equal(numberOfIntervals, tableNumberOfIntervals);
         });

         it("maximal time interval is 24 hours, which renders 48 cells", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 0;
            const endHour = 24;
            const numberOfIntervals = (endHour - startHour) * 2;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            const tableNumberOfIntervals = divTest1.querySelector("tr").querySelectorAll("td").length;
            assert.equal(numberOfIntervals, tableNumberOfIntervals);
         });

         it("when there is no days to render, Error should be written in a div", () => {
            const days = [];
            const startHour = 8;
            const endHour = 12;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            assert.equal(divTest1.innerText, "Error");
         });

         it("if startHour or endHour are not whole numbers, Error should be written in a div", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8.5;
            const endHour = 12;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            assert.equal(divTest1.innerText, "Error");
         });

         it("if startHour or endHour are not in 0-24 interval included, Error should be written in a div", () => {
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const startHour = 8;
            const endHour = 25;
            new Raspored().iscrtajRaspored(divTest1, days, startHour, endHour);
            assert.equal(divTest1.innerText, "Error");
         });
    });

    describe("dodajAktivnost", () => {
        const days = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];
        const startTime = 8;
        const endTime = 21;

        const divTest2 = document.getElementById("test2");

        const raspored = new Raspored();
        raspored.iscrtajRaspored(divTest2, days, startTime, endTime);

        it("if table is not created, we should get error message: Error - time table is not created!", () => {
            const emptyDiv = document.getElementById("test1");
            emptyDiv.innerHTML = "";
            const message = raspored.dodajAktivnost(emptyDiv, "Act1", "act", 10, 12, "Day!");
            assert.equal(message, "Error - time table is not created!");
        });

        it("if start or end time is not whole or half number, we should get error message: Error - in the time table there is no day or hour for the new activity!", () => {
            const message = raspored.dodajAktivnost(divTest2, "Act1", "act", 10.3, 12, "Day1");
            assert.equal(message, "Error - in the time table there is no day or hour for the new activity!");
        });

        it("if start or end time is not in the interval startHour-endHour, we should get error message: Error - in the time table there is no day or hour for the new activity!", () => {
            const message = raspored.dodajAktivnost(divTest2, "Act1", "act", 10, 22, "Day1");
            assert.equal(message, "Error - in the time table there is no day or hour for the new activity!");
        });

        it("if the new activity overlaps with any of the existing, we should get error mesage: Error - there is already an activity in the time table for the given time interval!", () => {
            // We add one regular activity for testing overlap
            const succesMessage = raspored.dodajAktivnost(divTest2, "Act1", "act", 12, 16, "Day1");
            assert.equal(succesMessage, "New activity successfully added");

            const endOverLap = raspored.dodajAktivnost(divTest2, "Act1", "act", 10, 13, "Day1");
            assert.equal(endOverLap, "Error - there is already an activity in the time table for the given time interval!");

            const startOverLap = raspored.dodajAktivnost(divTest2, "Act1", "act", 15, 17, "Day1");
            assert.equal(startOverLap, "Error - there is already an activity in the time table for the given time interval!");

            const innerOverLap = raspored.dodajAktivnost(divTest2, "Act1", "act", 13, 15, "Day1");
            assert.equal(innerOverLap, "Error - there is already an activity in the time table for the given time interval!");

            const outerOverLap = raspored.dodajAktivnost(divTest2, "Act1", "act", 9, 17, "Day1");
            assert.equal(outerOverLap, "Error - there is already an activity in the time table for the given time interval!");
        });

        it("adding an activity for non existing day should return error message : Error - in the time table there is no day or hour for the new activity!", () => {
            const message = raspored.dodajAktivnost(divTest2, "Act1", "act", 10, 22, "DayUnknown");
            assert.equal(message, "Error - in the time table there is no day or hour for the new activity!");
        });

        it("when start is whole number and end is whole number, left and right borders should be solid", () => {
            const succesMessage = raspored.dodajAktivnost(divTest2, "Exec2", "solid-solid", 8, 10, "Day2");
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            const expectedClassList = "cell-solid-solid content";

            assert.equal(expectedClassList, lastAcctivityAddedCell.classList.toString());
        });

        it("when start is half number and end is half number, left and right borders should be dashed", () => {
            const succesMessage = raspored.dodajAktivnost(divTest2, "Exec2", "dash-dash", 10.5, 12.5, "Day2");
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            const expectedClassList = "cell-dash-dash content";

            assert.equal(expectedClassList, lastAcctivityAddedCell.classList.toString());
        });

        it("when start is half number and end is whole number, left border should be dashed and right border should be solid", () => {
            const succesMessage = raspored.dodajAktivnost(divTest2, "Exec2", "dash-solid", 13.5, 15, "Day2");
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            const expectedClassList = "cell-dash-solid content";

            assert.equal(expectedClassList, lastAcctivityAddedCell.classList.toString());
        });

        it("when start is whole number and end is half number, left border should be solid and right border should be dashed", () => {
            const succesMessage = raspored.dodajAktivnost(divTest2, "Exec2", "solid-dash", 16, 17.5, "Day2");
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            const expectedClassList = "cell-solid-dash content";

            assert.equal(expectedClassList, lastAcctivityAddedCell.classList.toString());
        });

        it("activity can span throught the whole interval from startHour to endHour", () => {
            const activityStart = 8;
            const activityEnd = 21;
            const dayOfActivity = "Day3";
            const numOfIntervals = (activityEnd - activityStart) * 2;

            const succesMessage = raspored.dodajAktivnost(divTest2, "Act3", "whole day activity", activityStart, activityEnd, dayOfActivity);
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            const row = lastAcctivityAddedCell.parentElement;
            const dayTable = row.childNodes[0];
            const colspan = lastAcctivityAddedCell.getAttribute("colspan");

            assert.equal(row.childElementCount, 2, "Should only have two cells, day cell and one activity");
            assert.equal(dayTable.textContent, dayOfActivity);
            assert.equal(numOfIntervals, colspan, "cell shoud span for numOfItervals columns");
        });

        it("activity min span is one cell, when the activity duration is half and hour", () => {
            const succesMessage = raspored.dodajAktivnost(divTest2, "Act4", "0.5", 8, 8.5, "Day4");
            assert.equal(succesMessage, "New activity successfully added");

            const lastAcctivityAddedCell = divTest2.querySelector("#last-added-activity");
            assert.equal(lastAcctivityAddedCell.getAttribute("colspan"), 1);
        });
    });
});
